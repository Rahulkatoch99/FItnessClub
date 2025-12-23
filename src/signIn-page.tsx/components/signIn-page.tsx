import React, { useState, ChangeEvent, FormEvent } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { useNavigate } from "react-router-dom";
import { ALL_PERMISSIONS, PERMISSION_KEYS } from "../../main/types/permissions";
import { data as members } from "../../main/member-page/data";
import { Member } from "../../main/member-page/types";

type AuthMember = Member & { username?: string; password?: string };

// Minimal JWT builder using Web Crypto (HS256). For dev/demo only.
const base64UrlEncode = (data: Uint8Array) =>
  btoa(String.fromCharCode(...Array.from(data)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

async function signJwt(payload: Record<string, unknown>, secret: string) {
  const enc = new TextEncoder();
  const header = { alg: "HS256", typ: "JWT" };

  const headerStr = base64UrlEncode(enc.encode(JSON.stringify(header)));
  const payloadStr = base64UrlEncode(enc.encode(JSON.stringify(payload)));
  const toSign = `${headerStr}.${payloadStr}`;

  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(toSign));
  const signatureStr = base64UrlEncode(new Uint8Array(sig));

  return `${toSign}.${signatureStr}`;
}

export const SignInPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const issueToken = async (
    permissions: string[],
    role: string,
    user?: Partial<Member>
  ) => {
    const token = await signJwt({ permissions, role, user }, "dev-secret");
    return token;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "123@gmail.com" && password === "123") {
      // Admin: full access
      const adminPerms = ALL_PERMISSIONS.filter(
        (p) => p !== PERMISSION_KEYS.EXERCISE_LOG_VIEW && p !== PERMISSION_KEYS.WORKOUT_PLAN_VIEW
      );
      const token = await issueToken(adminPerms, "admin");
      localStorage.setItem("auth_token", token);
      console.log("Signed in as admin with full permissions");
      navigate("/main-page", { replace: true });
      return;
    }

    const memberList = members as AuthMember[];
    const matchedMember = memberList.find(
      (m) =>
        (m.username === email || m.phone === email || m.email === email) &&
        m.password === password
    );

    if (matchedMember) {
      // Members get only member-facing features
      const userPerms = [
        PERMISSION_KEYS.PROFILE_VIEW,
        PERMISSION_KEYS.EXERCISE_LOG_VIEW,
        PERMISSION_KEYS.WORKOUT_PLAN_VIEW,
        PERMISSION_KEYS.MEMBERSHIP_TYPE_VIEW,
      ];
      const token = await issueToken(userPerms, "member", {
        id: matchedMember.id,
        name: matchedMember.name,
        plan: matchedMember.plan,
        phone: matchedMember.phone,
        username: matchedMember.username,
        address: matchedMember.address,
        avatar: matchedMember.avatar,
        dueDate: matchedMember.dueDate,
      });
      localStorage.setItem("auth_token", token);
      localStorage.setItem("current_user", JSON.stringify(matchedMember));
      console.log("Signed in as member", matchedMember.username);
      navigate("/main-page", { replace: true });
      return;
    }

    alert("Invalid credentials");
  };

  const accentColor = "#ff6835";

  return (
    <div
      style={{
        backgroundColor: "#0a0a0f",
        color: "#fff",
        minHeight: "60vh",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px 0 20px",
      }}
    >
      <Container style={{ maxWidth: "400px" }}>
        <Card
          style={{
            backgroundColor: "#1e1e26",
            border: "1px solid #333",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <Card.Body>
            {/* Logo */}
            <div
              className="d-flex align-items-center gap-2 justify-content-center mb-4"
              style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 700 }}
            >
              <FitnessCenterIcon
                style={{ color: accentColor, fontSize: "1.8rem" }}
              />
              FITNESS CLUB
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#fff", fontSize: "0.9rem" }}>
                  Email ID
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  style={{
                    backgroundColor: "#2a2a33",
                    color: "#fff",
                    border: "1px solid #444",
                    fontSize: "0.9rem",
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#fff", fontSize: "0.9rem" }}>
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  style={{
                    backgroundColor: "#2a2a33",
                    color: "#fff",
                    border: "1px solid #444",
                    fontSize: "0.9rem",
                  }}
                />
              </Form.Group>

              <Button
                type="submit"
                style={{
                  backgroundColor: accentColor,
                  border: "none",
                  fontWeight: "bold",
                  padding: "10px",
                  borderRadius: "6px",
                  width: "100%",
                  fontSize: "1rem",
                }}
              >
                Sign In
              </Button>
            </Form>

            <div
              className="text-center mt-3"
              style={{ color: "#aaa", fontSize: "0.85rem" }}
            >
              Don't have an account?{" "}
              <a href="/signup" style={{ color: accentColor }}>
                Register your gym
              </a>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
