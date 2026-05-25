"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PortalAuthModal from "@/components/PortalAuthModal";

interface PortalProtectionProps {
  portalType: "admin" | "client";
  children: React.ReactNode;
}

export default function PortalProtection({
  portalType,
  children,
}: PortalProtectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user already has valid session token for this portal
    const token = localStorage.getItem(`portal_token_${portalType}`);
    const tokenTime = localStorage.getItem(`portal_token_time_${portalType}`);

    if (token && tokenTime) {
      // Check if token is still valid (24 hours)
      const issuedTime = parseInt(tokenTime);
      const currentTime = Date.now();
      const expiryTime = 24 * 60 * 60 * 1000; // 24 hours

      if (currentTime - issuedTime < expiryTime) {
        setIsAuthenticated(true);
        setShowModal(false);
      } else {
        // Token expired
        localStorage.removeItem(`portal_token_${portalType}`);
        localStorage.removeItem(`portal_token_time_${portalType}`);
        setShowModal(true);
      }
    } else {
      setShowModal(true);
    }
  }, [portalType]);

  const handleAuthSuccess = (token: string) => {
    // Store token and timestamp
    localStorage.setItem(`portal_token_${portalType}`, token);
    localStorage.setItem(`portal_token_time_${portalType}`, Date.now().toString());
    setIsAuthenticated(true);
    setShowModal(false);
  };

  const handleAuthClose = () => {
    // Redirect back if user cancels auth
    router.push("/");
  };

  if (!isAuthenticated) {
    return (
      <>
        <PortalAuthModal
          portalType={portalType}
          isOpen={showModal}
          onSuccess={handleAuthSuccess}
          onClose={handleAuthClose}
        />
      </>
    );
  }

  return <>{children}</>;
}
