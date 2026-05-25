import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

export async function POST(req: Request) {
  try {
    const { portalType, password } = await req.json();

    // Validate input
    if (!portalType || !password) {
      return Response.json(
        { error: "Portal type and password are required" },
        { status: 400 }
      );
    }

    if (!["admin", "client"].includes(portalType)) {
      return Response.json(
        { error: "Invalid portal type" },
        { status: 400 }
      );
    }

    // Get stored credential hash from database
    const { data, error } = await supabase
      .from("portal_credentials")
      .select("password_hash, is_active")
      .eq("portal_type", portalType)
      .single();

    if (error || !data) {
      // Log attempt
      await supabase
        .from("portal_login_attempts")
        .insert({
          portal_type: portalType,
          success: false,
          ip_address: req.headers.get("x-forwarded-for") || "unknown",
        });

      return Response.json(
        { error: "Invalid portal type" },
        { status: 401 }
      );
    }

    if (!data.is_active) {
      return Response.json(
        { error: "This portal is currently disabled" },
        { status: 403 }
      );
    }

    // Compare password with hash
    const isPasswordValid = await bcrypt.compare(password, data.password_hash);

    if (!isPasswordValid) {
      // Log failed attempt
      await supabase
        .from("portal_login_attempts")
        .insert({
          portal_type: portalType,
          success: false,
          ip_address: req.headers.get("x-forwarded-for") || "unknown",
        });

      return Response.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }

    // Log successful attempt
    await supabase
      .from("portal_login_attempts")
      .insert({
        portal_type: portalType,
        success: true,
        ip_address: req.headers.get("x-forwarded-for") || "unknown",
      });

    // Generate session token (optional - can use cookies or JWT)
    const token = Buffer.from(
      `${portalType}:${Date.now()}:${Math.random()}`
    ).toString("base64");

    return Response.json(
      {
        success: true,
        token,
        portalType,
        message: `Successfully authenticated for ${portalType} portal`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Authentication error:", error);
    return Response.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

// Get password hash generation endpoint (admin only for setup)
export async function PUT(req: Request) {
  try {
    const { portalType, newPassword, adminPassword } = await req.json();

    // Verify admin password before allowing changes
    const { data: adminData } = await supabase
      .from("portal_credentials")
      .select("password_hash")
      .eq("portal_type", "admin")
      .single();

    if (!adminData) {
      return Response.json(
        { error: "Admin portal not configured" },
        { status: 500 }
      );
    }

    const isAdminValid = await bcrypt.compare(
      adminPassword,
      adminData.password_hash
    );

    if (!isAdminValid) {
      return Response.json(
        { error: "Invalid admin password" },
        { status: 401 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    const { error } = await supabase
      .from("portal_credentials")
      .update({ password_hash: hashedPassword, updated_at: new Date() })
      .eq("portal_type", portalType);

    if (error) {
      return Response.json(
        { error: "Failed to update password" },
        { status: 500 }
      );
    }

    return Response.json(
      { success: true, message: `Password updated for ${portalType} portal` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password update error:", error);
    return Response.json(
      { error: "Password update failed" },
      { status: 500 }
    );
  }
}
