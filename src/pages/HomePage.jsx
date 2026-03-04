import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import grievancesImage from "../assets/grievances.svg";
import complaintBoxImage from "../assets/complaint_box.svg";

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "student") {
        navigate("/student", { replace: true });
      } else if (user.role === "faculty") {
        navigate("/student", { replace: true });
      } else if (user.role === "admin") {
        navigate("/admin", { replace: true });
      }
    }
  }, [user, navigate]);
  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "#FFFFFF",
      padding: "0",
      margin: "-32px 0 -64px 0",
      width: "100vw",
      position: "relative",
      left: "50%",
      right: "50%",
      marginLeft: "-50vw",
      marginRight: "-50vw"
    }}>
      {/* Hero Section */}
      <div style={{ 
        maxWidth: 1200, 
        margin: "0 auto", 
        padding: "20px 24px",
        marginBottom: 40
      }}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: 40, 
          alignItems: "center",
          marginBottom: 40 
        }}>
          <div style={{ color: "#1a202c" }}>
            <div style={{ 
              background: "linear-gradient(135deg, #E9F1FA 0%, #00ABE4 100%)", 
              display: "inline-block", 
              padding: "8px 16px", 
              borderRadius: 20, 
              fontSize: 13, 
              fontWeight: 600,
              marginBottom: 20,
              color: "white"
            }}>
              🔒 Secure & Anonymous
            </div>
            <h1 style={{ 
              fontSize: 48, 
              fontWeight: 900, 
              margin: "0 0 20px 0", 
              lineHeight: 1.2,
              letterSpacing: "-1px"
            }}>
              Sri Eshwar College<br />Grievance System
            </h1>
            <p style={{ 
              fontSize: 18, 
              lineHeight: 1.6, 
              opacity: 0.95,
              margin: "0 0 32px 0"
            }}>
              A secure and anonymous platform for students and faculty at Sri Eshwar College of Engineering to report grievances, track resolution SLAs, and ensure institutional accountability.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link 
                className="button" 
                to="/register"
                style={{ 
                  background: "linear-gradient(135deg, #00ABE4 0%, #0088BB 100%)", 
                  color: "white", 
                  padding: "14px 32px",
                  fontSize: 16,
                  fontWeight: 700,
                  boxShadow: "0 4px 12px rgba(0,171,228,0.3)",
                  border: "none"
                }}
              >
                Get Started →
              </Link>
              <Link 
                className="button ghost" 
                to="/login"
                style={{ 
                  background: "white", 
                  color: "#00ABE4",
                  border: "2px solid #00ABE4",
                  padding: "14px 32px",
                  fontSize: 16,
                  fontWeight: 700
                }}
              >
                Log in
              </Link>
            </div>
          </div>

          <div className="card" style={{ 
            background: "white", 
            borderRadius: 24,
            padding: 24,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            border: "1px solid #e2e8f0"
          }}>
            <h2 style={{ 
              fontSize: 28, 
              fontWeight: 800, 
              margin: "0 0 24px 0",
              background: "linear-gradient(135deg, #00ABE4 0%, #0088BB 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Why this platform?
            </h2>
            <div style={{ display: "grid", gap: 20 }}>
              <div style={{ display: "flex", gap: 16, alignItems: "start" }}>
                <div style={{ 
                  background: "linear-gradient(135deg, #00ABE4 0%, #0088BB 100%)", 
                  width: 48, 
                  height: 48, 
                  borderRadius: 12, 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  fontSize: 24,
                  flexShrink: 0
                }}>
                  🔐
                </div>
                <div>
                  <h3 style={{ margin: "0 0 6px 0", fontSize: 16, fontWeight: 700, color: "#333" }}>
                    Anonymous Reporting
                  </h3>
                  <p style={{ margin: 0, fontSize: 14, color: "#666", lineHeight: 1.5 }}>
                    Protect your identity while reporting issues. No personal details are revealed.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: 16, alignItems: "start" }}>
                <div style={{ 
                  background: "linear-gradient(135deg, #00ABE4 0%, #0095CC 100%)", 
                  width: 48, 
                  height: 48, 
                  borderRadius: 12, 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  fontSize: 24,
                  flexShrink: 0
                }}>
                  📊
                </div>
                <div>
                  <h3 style={{ margin: "0 0 6px 0", fontSize: 16, fontWeight: 700, color: "#333" }}>
                    Role-Based System
                  </h3>
                  <p style={{ margin: 0, fontSize: 14, color: "#666", lineHeight: 1.5 }}>
                    Separate dashboards for Students, Faculty, and Admin staff.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: 16, alignItems: "start" }}>
                <div style={{ 
                  background: "linear-gradient(135deg, #00ABE4 0%, #00C8E8 100%)", 
                  width: 48, 
                  height: 48, 
                  borderRadius: 12, 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  fontSize: 24,
                  flexShrink: 0
                }}>
                  ⏱️
                </div>
                <div>
                  <h3 style={{ margin: "0 0 6px 0", fontSize: 16, fontWeight: 700, color: "#333" }}>
                    SLA Tracking
                  </h3>
                  <p style={{ margin: 0, fontSize: 14, color: "#666", lineHeight: 1.5 }}>
                    Automated countdown with real-time escalation alerts.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: 16, alignItems: "start" }}>
                <div style={{ 
                  background: "linear-gradient(135deg, #00ABE4 0%, #00D4F0 100%)", 
                  width: 48, 
                  height: 48, 
                  borderRadius: 12, 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  fontSize: 24,
                  flexShrink: 0
                }}>
                  ✅
                </div>
                <div>
                  <h3 style={{ margin: "0 0 6px 0", fontSize: 16, fontWeight: 700, color: "#333" }}>
                    Transparent Resolution
                  </h3>
                  <p style={{ margin: 0, fontSize: 14, color: "#666", lineHeight: 1.5 }}>
                    Track status updates and provide feedback on resolutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ 
        maxWidth: 1200, 
        margin: "0 auto", 
        padding: "24px 24px",
        marginBottom: 40
      }}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
          gap: 24, 
          marginBottom: 40 
        }}>
          <div style={{ 
            background: "linear-gradient(135deg, #00ABE4 0%, #0088BB 100%)", 
            borderRadius: 20, 
            padding: 20, 
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,171,228,0.2)"
          }}>
            <div style={{ fontSize: 42, fontWeight: 900, color: "white", marginBottom: 8 }}>72h</div>
            <div style={{ fontSize: 14, color: "white", fontWeight: 600, opacity: 0.95 }}>SLA Resolution Time</div>
          </div>
          <div style={{ 
            background: "linear-gradient(135deg, #00ABE4 0%, #00C8E8 100%)", 
            borderRadius: 20, 
            padding: 20, 
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,171,228,0.2)"
          }}>
            <div style={{ fontSize: 42, fontWeight: 900, color: "white", marginBottom: 8 }}>100%</div>
            <div style={{ fontSize: 14, color: "white", fontWeight: 600, opacity: 0.95 }}>Anonymous & Secure</div>
          </div>
          <div style={{ 
            background: "linear-gradient(135deg, #00ABE4 0%, #00D4F0 100%)", 
            borderRadius: 20, 
            padding: 20, 
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,171,228,0.2)"
          }}>
            <div style={{ fontSize: 42, fontWeight: 900, color: "white", marginBottom: 8 }}>24/7</div>
            <div style={{ fontSize: 14, color: "white", fontWeight: 600, opacity: 0.95 }}>Access Anytime</div>
          </div>
        </div>
      </div>

      {/* Grievances Image Section */}
      <div style={{
        maxWidth: 1200,
        margin: "0 auto 40px",
        padding: "0 24px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 40,
        alignItems: "center"
      }}>
        <div style={{ color: "#1a202c" }}>
          <h2 style={{
            fontSize: 36,
            fontWeight: 800,
            margin: "0 0 20px 0",
            letterSpacing: "-0.5px"
          }}>
            Track & Monitor Grievances
          </h2>
          <p style={{
            fontSize: 18,
            lineHeight: 1.6,
            color: "#4a5568",
            margin: "0 0 24px 0"
          }}>
            Our system provides comprehensive tracking of all submitted grievances with real-time updates and SLA monitoring to ensure timely resolution.
          </p>
          <ul style={{
            listStyle: "none",
            padding: 0,
            margin: 0
          }}>
            <li style={{ fontSize: 16, color: "#2d3748", marginBottom: 12, display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ color: "#00ABE4", fontWeight: 700 }}>✓</span>
              Real-time status updates
            </li>
            <li style={{ fontSize: 16, color: "#2d3748", marginBottom: 12, display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ color: "#00ABE4", fontWeight: 700 }}>✓</span>
              SLA countdown timer
            </li>
            <li style={{ fontSize: 16, color: "#2d3748", marginBottom: 12, display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ color: "#00ABE4", fontWeight: 700 }}>✓</span>
              Priority escalation alerts
            </li>
            <li style={{ fontSize: 16, color: "#2d3748", display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ color: "#00ABE4", fontWeight: 700 }}>✓</span>
              Detailed resolution logs
            </li>
          </ul>
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 300
        }}>
          <img
            src={grievancesImage}
            alt="Grievances Tracking"
            style={{
              width: "100%",
              maxWidth: "350px",
              height: "auto",
              objectFit: "contain"
            }}
          />
        </div>
      </div>

      {/* How It Works Section */}
      <div style={{ 
        maxWidth: 1200, 
        margin: "0 auto 40px", 
        padding: "0 24px"
      }}>
        <h2 style={{ 
            fontSize: 36, 
            fontWeight: 800, 
            textAlign: "center", 
            color: "#1a202c", 
            marginBottom: 48,
            letterSpacing: "-0.5px"
          }}>
            How It Works
          </h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
            gap: 32 
          }}>
            <div style={{ 
              background: "white", 
              borderRadius: 20, 
              padding: 32,
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "1px solid #e2e8f0"
            }}>
              <div style={{ 
              background: "linear-gradient(135deg, #00ABE4 0%, #0088BB 100%)",
                width: 64,
                height: 64,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                fontSize: 28,
                fontWeight: 900,
                color: "white"
              }}>
                1
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px 0", color: "#333" }}>
                Register
              </h3>
              <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, margin: 0 }}>
                Create your account using your college email (@sece.ac.in) as a student or faculty member.
              </p>
            </div>

            <div style={{ 
              background: "white", 
              borderRadius: 20, 
              padding: 32,
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "1px solid #e2e8f0"
            }}>
              <div style={{ 
              background: "linear-gradient(135deg, #00ABE4 0%, #0095CC 100%)",
                width: 64,
                height: 64,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                fontSize: 28,
                fontWeight: 900,
                color: "white"
              }}>
                2
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px 0", color: "#333" }}>
                Submit Grievance
              </h3>
              <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, margin: 0 }}>
                Anonymously report issues in categories like Academic, Hostel, Harassment, or Facilities.
              </p>
            </div>

            <div style={{ 
              background: "white", 
              borderRadius: 20, 
              padding: 32,
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "1px solid #e2e8f0"
            }}>
              <div style={{ 
              background: "linear-gradient(135deg, #00ABE4 0%, #00C8E8 100%)",
                width: 64,
                height: 64,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                fontSize: 28,
                fontWeight: 900,
                color: "white"
              }}>
                3
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px 0", color: "#333" }}>
                Track Status
              </h3>
              <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, margin: 0 }}>
                Monitor your complaint's progress with real-time SLA countdown and status updates.
              </p>
            </div>

            <div style={{ 
              background: "white", 
              borderRadius: 20, 
              padding: 32,
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "1px solid #e2e8f0"
            }}>
              <div style={{ 
              background: "linear-gradient(135deg, #00ABE4 0%, #00D4F0 100%)",
                width: 64,
                height: 64,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                fontSize: 28,
                fontWeight: 900,
                color: "white"
              }}>
                4
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px 0", color: "#333" }}>
                Provide Feedback
              </h3>
              <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, margin: 0 }}>
                Rate resolved grievances to help improve the system and accountability.
              </p>
            </div>
          </div>
      </div>

      {/* Features Section */}
      <div style={{ 
        maxWidth: 1200, 
        margin: "0 auto 40px", 
        padding: "0 24px"
      }}>
        <h2 style={{ 
            fontSize: 36, 
            fontWeight: 800, 
            textAlign: "center", 
            color: "#1a202c", 
            marginBottom: 48,
            letterSpacing: "-0.5px"
          }}>
            Key Features
          </h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
            gap: 24 
          }}>
            <div style={{ 
              background: "white", 
              borderRadius: 16, 
              padding: 28,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "1px solid #e2e8f0"
            }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>🎯</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px 0", color: "#1a202c" }}>
                Category-Based
              </h3>
              <p style={{ fontSize: 14, color: "#718096", lineHeight: 1.6, margin: 0 }}>
                Submit grievances under specific categories for faster department routing and resolution.
              </p>
            </div>

            <div style={{ 
              background: "white", 
              borderRadius: 16, 
              padding: 28,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "1px solid #e2e8f0"
            }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>🚨</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px 0", color: "#1a202c" }}>
                Auto-Escalation
              </h3>
              <p style={{ fontSize: 14, color: "#718096", lineHeight: 1.6, margin: 0 }}>
                Complaints automatically escalate if not resolved within the 72-hour SLA deadline.
              </p>
            </div>

            <div style={{ 
              background: "white", 
              borderRadius: 16, 
              padding: 28,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "1px solid #e2e8f0"
            }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>🛡️</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px 0", color: "#1a202c" }}>
                Profanity Filter
              </h3>
              <p style={{ fontSize: 14, color: "#718096", lineHeight: 1.6, margin: 0 }}>
                Automated filtering ensures professional and respectful communication.
              </p>
            </div>

            <div style={{ 
              background: "white", 
              borderRadius: 16, 
              padding: 28,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "1px solid #e2e8f0"
            }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>📝</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px 0", color: "#1a202c" }}>
                Daily Limits
              </h3>
              <p style={{ fontSize: 14, color: "#718096", lineHeight: 1.6, margin: 0 }}>
                Maximum 2 grievances per day to prevent spam and ensure quality submissions.
              </p>
            </div>

            <div style={{ 
              background: "white", 
              borderRadius: 16, 
              padding: 28,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "1px solid #e2e8f0"
            }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>⭐</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px 0", color: "#1a202c" }}>
                Rating System
              </h3>
              <p style={{ fontSize: 14, color: "#718096", lineHeight: 1.6, margin: 0 }}>
                Rate resolved grievances to provide feedback on resolution quality.
              </p>
            </div>

            <div style={{ 
              background: "white", 
              borderRadius: 16, 
              padding: 28,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "1px solid #e2e8f0"
            }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>💬</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px 0", color: "#1a202c" }}>
                Admin Remarks
              </h3>
              <p style={{ fontSize: 14, color: "#718096", lineHeight: 1.6, margin: 0 }}>
                Admins can add remarks and updates visible to grievance reporters.
              </p>
            </div>
          </div>
      </div>

      {/* Complaint Box Section */}
      <div style={{
        maxWidth: 1200,
        margin: "0 auto 40px",
        padding: "0 24px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 40,
        alignItems: "center"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 300,
          order: -1
        }}>
          <img
            src={complaintBoxImage}
            alt="Complaint Submission"
            style={{
              width: "100%",
              maxWidth: "300px",
              height: "auto",
              objectFit: "contain"
            }}
          />
        </div>
        <div style={{ color: "#1a202c" }}>
          <h2 style={{
            fontSize: 36,
            fontWeight: 800,
            margin: "0 0 20px 0",
            letterSpacing: "-0.5px"
          }}>
            Easy Anonymous Reporting
          </h2>
          <p style={{
            fontSize: 18,
            lineHeight: 1.6,
            color: "#4a5568",
            margin: "0 0 24px 0"
          }}>
            Submit grievances with complete anonymity. Your identity is never revealed while we work to resolve your concerns efficiently and professionally.
          </p>
          <ul style={{
            listStyle: "none",
            padding: 0,
            margin: 0
          }}>
            <li style={{ fontSize: 16, color: "#2d3748", marginBottom: 12, display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ color: "#00ABE4", fontWeight: 700 }}>✓</span>
              No email required for submission
            </li>
            <li style={{ fontSize: 16, color: "#2d3748", marginBottom: 12, display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ color: "#00ABE4", fontWeight: 700 }}>✓</span>
              Protected by encryption
            </li>
            <li style={{ fontSize: 16, color: "#2d3748", marginBottom: 12, display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ color: "#00ABE4", fontWeight: 700 }}>✓</span>
              Multiple categories available
            </li>
            <li style={{ fontSize: 16, color: "#2d3748", display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ color: "#00ABE4", fontWeight: 700 }}>✓</span>
              Instant acknowledgment
            </li>
          </ul>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ 
        maxWidth: 1200, 
        margin: "0 auto", 
        padding: "0 24px 20px"
      }}>
        <div style={{ 
          background: "linear-gradient(135deg, #E9F1FA 0%, #00ABE4 100%)", 
          borderRadius: 24, 
          padding: "40px 32px",
          textAlign: "center",
          boxShadow: "0 8px 24px rgba(0,171,228,0.2)"
        }}>
          <h2 style={{ 
            fontSize: 32, 
            fontWeight: 800, 
            color: "white", 
            marginBottom: 16,
            letterSpacing: "-0.5px"
          }}>
            Ready to Report an Issue?
          </h2>
          <p style={{ 
            fontSize: 18, 
            color: "white", 
            marginBottom: 32,
            maxWidth: 600,
            margin: "0 auto 32px",
            opacity: 0.95
          }}>
            Join your fellow students and faculty in making Sri Eshwar College a better place through transparent and anonymous grievance reporting.
          </p>
          <Link 
            className="button" 
            to="/register"
            style={{ 
              background: "white", 
              color: "#00ABE4", 
              padding: "16px 40px",
              fontSize: 18,
              fontWeight: 700,
              boxShadow: "0 4px 12px rgba(0,171,228,0.2)",
              border: "none",
              display: "inline-block"
            }}
          >
            Create Your Account →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        background: "linear-gradient(135deg, rgb(26, 32, 44) 0%, rgb(45, 55, 72) 100%)",
        color: "white",
        padding: "48px 0 24px",
        marginTop: 60,
        width: "100%"
      }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px"
        }}>
          {/* Footer Content */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 40,
            marginBottom: 40,
            paddingBottom: 40,
            borderBottom: "1px solid rgba(255,255,255,0.1)"
          }}>
            {/* College Info */}
            <div>
              <h3 style={{
                fontSize: 18,
                fontWeight: 700,
                margin: "0 0 16px 0",
                color: "#00ABE4"
              }}>
                Sri Eshwar College
              </h3>
              <p style={{
                fontSize: 14,
                lineHeight: 1.6,
                margin: "0 0 12px 0",
                opacity: 0.9
              }}>
                Sri Eshwar College of Engineering
              </p>
              <p style={{
                fontSize: 14,
                lineHeight: 1.6,
                margin: 0,
                opacity: 0.8
              }}>
                Coimbatore, Tamil Nadu, India
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{
                fontSize: 16,
                fontWeight: 700,
                margin: "0 0 16px 0",
                color: "#00ABE4"
              }}>
                Quick Links
              </h4>
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0
              }}>
                <li style={{ marginBottom: 10 }}>
                  <Link to="/" style={{
                    color: "white",
                    fontSize: 14,
                    opacity: 0.8,
                    textDecoration: "none",
                    transition: "opacity 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = "1"}
                  onMouseLeave={(e) => e.target.style.opacity = "0.8"}
                  >
                    Home
                  </Link>
                </li>
                <li style={{ marginBottom: 10 }}>
                  <Link to="/login" style={{
                    color: "white",
                    fontSize: 14,
                    opacity: 0.8,
                    textDecoration: "none",
                    transition: "opacity 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = "1"}
                  onMouseLeave={(e) => e.target.style.opacity = "0.8"}
                  >
                    Log In
                  </Link>
                </li>
                <li style={{ marginBottom: 10 }}>
                  <Link to="/register" style={{
                    color: "white",
                    fontSize: 14,
                    opacity: 0.8,
                    textDecoration: "none",
                    transition: "opacity 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = "1"}
                  onMouseLeave={(e) => e.target.style.opacity = "0.8"}
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <a href="#contact" style={{
                    color: "white",
                    fontSize: 14,
                    opacity: 0.8,
                    textDecoration: "none",
                    transition: "opacity 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = "1"}
                  onMouseLeave={(e) => e.target.style.opacity = "0.8"}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 style={{
                fontSize: 16,
                fontWeight: 700,
                margin: "0 0 16px 0",
                color: "#00ABE4"
              }}>
                Support
              </h4>
              <ul style={{
                listStyle: "none",
                padding: 0,
                margin: 0
              }}>
                <li style={{ marginBottom: 10 }}>
                  <a href="mailto:grievance@sece.ac.in" style={{
                    color: "white",
                    fontSize: 14,
                    opacity: 0.8,
                    textDecoration: "none",
                    transition: "opacity 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = "1"}
                  onMouseLeave={(e) => e.target.style.opacity = "0.8"}
                  >
                    Email Support
                  </a>
                </li>
                <li style={{ marginBottom: 10 }}>
                  <a href="#faq" style={{
                    color: "white",
                    fontSize: 14,
                    opacity: 0.8,
                    textDecoration: "none",
                    transition: "opacity 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = "1"}
                  onMouseLeave={(e) => e.target.style.opacity = "0.8"}
                  >
                    FAQ
                  </a>
                </li>
                <li style={{ marginBottom: 10 }}>
                  <a href="#privacy" style={{
                    color: "white",
                    fontSize: 14,
                    opacity: 0.8,
                    textDecoration: "none",
                    transition: "opacity 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = "1"}
                  onMouseLeave={(e) => e.target.style.opacity = "0.8"}
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" style={{
                    color: "white",
                    fontSize: 14,
                    opacity: 0.8,
                    textDecoration: "none",
                    transition: "opacity 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = "1"}
                  onMouseLeave={(e) => e.target.style.opacity = "0.8"}
                  >
                    Terms of Use
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 style={{
                fontSize: 16,
                fontWeight: 700,
                margin: "0 0 16px 0",
                color: "#00ABE4"
              }}>
                Contact Us
              </h4>
              <div style={{
                fontSize: 14,
                lineHeight: 1.8,
                opacity: 0.9
              }}>
                <p style={{ margin: "0 0 12px 0" }}>
                  📧 <a href="mailto:grievance@sece.ac.in" style={{ color: "#00ABE4", textDecoration: "none" }}>grievance@sece.ac.in</a>
                </p>
                <p style={{ margin: "0 0 12px 0" }}>
                  📞 +91-XXXX-XXXX-XX
                </p>
                <p style={{ margin: 0 }}>
                  📍 Coimbatore, TN 641105
                </p>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 20,
            fontSize: 13,
            opacity: 0.7
          }}>
            <p style={{ margin: 0 }}>
              © 2026 Sri Eshwar College of Engineering. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: 24 }}>
              <a href="#facebook" style={{ color: "#00ABE4", textDecoration: "none" }}>Facebook</a>
              <a href="#twitter" style={{ color: "#00ABE4", textDecoration: "none" }}>Twitter</a>
              <a href="#linkedin" style={{ color: "#00ABE4", textDecoration: "none" }}>LinkedIn</a>
              <a href="#instagram" style={{ color: "#00ABE4", textDecoration: "none" }}>Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
