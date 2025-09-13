import React from "react";
import { useAppStore } from "@/stores/appStore";

interface BaseTemplateProps {
  template?: any;
  resume?: any;
  isPreview?: boolean;
  className?: string;
}

export const BaseTemplate: React.FC<BaseTemplateProps> = ({
  template,
  resume,
  isPreview = false,
  className = "",
}) => {
  const { currentResume } = useAppStore();
  const resumeData = resume || currentResume;

  return (
    <div
      className={`resume-template bg-white min-h-[297mm] w-[210mm] mx-auto shadow-lg flex ${className}`}
      data-template-id={template?.id}
      style={{
        fontFamily: "Arial, sans-serif",
        fontSize: "12px",
        lineHeight: "1.3",
        color: "#333333",
        overflow: "hidden",
      }}>
      {/* Left Column - Main Content */}
      <div
        style={{
          width: "68%",
          padding: "25px 20px",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
        }}>
        {/* Header with Name */}
        <div style={{ marginBottom: "20px" }}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#2c3e50",
              margin: "0",
              letterSpacing: "0.5px",
            }}>
            {resumeData?.personalInfo?.firstName || "John"}{" "}
            {resumeData?.personalInfo?.lastName || "Doe"}
          </h1>

          {(resumeData?.personalInfo?.title || "Senior Frontend Developer") && (
            <div
              style={{
                fontSize: "14px",
                color: "#7f8c8d",
                fontWeight: "400",
                marginTop: "5px",
                marginBottom: "15px",
              }}>
              {resumeData?.personalInfo?.title || "Senior Frontend Developer"}
            </div>
          )}
        </div>

        {/* Summary Section */}
        <div style={{ marginBottom: "25px" }}>
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#2c3e50",
              marginBottom: "8px",
              paddingBottom: "8px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              borderBottom: "2px solid #34495e",
            }}>
            SUMMARY
          </h2>
          <p
            style={{
              color: "#555555",
              lineHeight: "1.4",
              margin: "0",
              textAlign: "justify",
              fontSize: "11px",
            }}>
            {resumeData?.personalInfo?.summary ||
              "Description of me: Senior Frontend Developer with extensive experience in React, TypeScript, and modern web development practices."}
          </p>
        </div>

        {/* Experience Section */}
        <div style={{ marginBottom: "25px", flex: "1" }}>
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#2c3e50",
              marginBottom: "12px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              borderBottom: "2px solid #34495e",
              paddingBottom: "12px",
            }}>
            EXPERIENCE
          </h2>

          {resumeData?.experiences?.length > 0 ? (
            resumeData.experiences.map((exp: any, index: number) => (
              <div
                key={index}
                style={{
                  marginBottom: "18px",
                  paddingBottom: "15px",
                  borderBottom:
                    index < resumeData.experiences.length - 1
                      ? "1px solid #ecf0f1"
                      : "none",
                }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "5px",
                  }}>
                  <div>
                    <h3
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#2c3e50",
                        margin: "0 0 3px 0",
                      }}>
                      {exp.position}
                    </h3>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#e74c3c",
                        fontWeight: "500",
                      }}>
                      {exp.company}
                      {exp.location && (
                        <span
                          style={{ color: "#7f8c8d", fontWeight: "normal" }}>
                          , {exp.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: "10px",
                      color: "#7f8c8d",
                      textAlign: "right",
                      whiteSpace: "nowrap",
                    }}>
                    {exp.startDate} -{" "}
                    {exp.isCurrentJob ? "Present" : exp.endDate}
                  </div>
                </div>

                {exp.description && (
                  <p
                    style={{
                      color: "#555555",
                      margin: "5px 0",
                      lineHeight: "1.3",
                      fontSize: "11px",
                    }}>
                    {exp.description}
                  </p>
                )}

                {exp.achievements?.length > 0 && (
                  <ul
                    style={{
                      margin: "5px 0 0 0",
                      paddingLeft: "15px",
                      color: "#555555",
                    }}>
                    {exp.achievements.map((achievement: string, i: number) => (
                      <li
                        key={i}
                        style={{
                          marginBottom: "3px",
                          lineHeight: "1.3",
                          fontSize: "10px",
                        }}>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          ) : (
            <div style={{ marginBottom: "18px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "5px",
                }}>
                <div>
                  <h3
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#2c3e50",
                      margin: "0 0 3px 0",
                    }}>
                    Senior Frontend Developer
                  </h3>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#e74c3c",
                      fontWeight: "500",
                    }}>
                    Tech Company
                  </div>
                </div>

                <div
                  style={{
                    fontSize: "10px",
                    color: "#7f8c8d",
                    textAlign: "right",
                  }}>
                  2022 - Present
                </div>
              </div>

              <p
                style={{
                  color: "#555555",
                  margin: "5px 0",
                  lineHeight: "1.3",
                  fontSize: "11px",
                }}>
                Leading frontend development team and implementing modern React
                solutions.
              </p>

              <ul
                style={{
                  margin: "5px 0 0 0",
                  paddingLeft: "15px",
                  color: "#555555",
                }}>
                <li
                  style={{
                    marginBottom: "3px",
                    lineHeight: "1.3",
                    fontSize: "10px",
                  }}>
                  Developed responsive web applications using React and
                  TypeScript
                </li>
                <li
                  style={{
                    marginBottom: "3px",
                    lineHeight: "1.3",
                    fontSize: "10px",
                  }}>
                  Improved application performance by 40%
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Education Section */}
        <div>
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#2c3e50",
              marginBottom: "12px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              borderBottom: "2px solid #34495e",
              paddingBottom: "3px",
            }}>
            EDUCATION
          </h2>

          {resumeData?.educations?.length > 0 ? (
            resumeData.educations.map((edu: any, index: number) => (
              <div key={index} style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}>
                  <div>
                    <h3
                      style={{
                        fontSize: "13px",
                        fontWeight: "bold",
                        color: "#2c3e50",
                        margin: "0 0 3px 0",
                      }}>
                      {edu.degree}
                    </h3>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#555555",
                        fontStyle: "italic",
                      }}>
                      {edu.institution}
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: "10px",
                      color: "#7f8c8d",
                      textAlign: "right",
                    }}>
                    <div>
                      {edu.startDate} - {edu.endDate}
                    </div>
                    {edu.gpa && (
                      <div style={{ marginTop: "2px" }}>GPA: {edu.gpa}</div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ marginBottom: "12px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}>
                <div>
                  <h3
                    style={{
                      fontSize: "13px",
                      fontWeight: "bold",
                      color: "#2c3e50",
                      margin: "0 0 3px 0",
                    }}>
                    Bachelor of Computer Science
                  </h3>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#555555",
                      fontStyle: "italic",
                    }}>
                    University of Technology
                  </div>
                </div>

                <div
                  style={{
                    fontSize: "10px",
                    color: "#7f8c8d",
                    textAlign: "right",
                  }}>
                  2018 - 2022
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Column - Sidebar */}
      <div
        style={{
          width: "32%",
          backgroundColor: "#4a5568",
          color: "#ffffff",
          padding: "25px 18px",
          display: "flex",
          flexDirection: "column",
        }}>
        {/* Profile Photo - Real Photo Display */}
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "#ffffff",
            borderRadius: "50%",
            margin: "0 auto 25px auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            color: "#7f8c8d",
            border: "3px solid #ffffff",
            backgroundImage: resumeData?.personalInfo?.photo
              ? `url(${resumeData.personalInfo.photo})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            overflow: "hidden",
          }}>
          {!resumeData?.personalInfo?.photo && "Photo"}
        </div>

        {/* Contact Section */}
        <div style={{ marginBottom: "25px" }}>
          <h2
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              color: "#ffffff",
              marginBottom: "12px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}>
            CONTACT
          </h2>

          <div style={{ fontSize: "10px", lineHeight: "1.4" }}>
            <div style={{ marginBottom: "8px" }}>
              <div style={{ fontWeight: "bold", marginBottom: "2px" }}>
                Phone:
              </div>
              <div>{resumeData?.personalInfo?.phone || "+989301107966"}</div>
            </div>

            <div style={{ marginBottom: "8px" }}>
              <div style={{ fontWeight: "bold", marginBottom: "2px" }}>
                Email:
              </div>
              <div style={{ wordBreak: "break-all" }}>
                {resumeData?.personalInfo?.email || "thisisziya@gmail.com"}
              </div>
            </div>

            <div style={{ marginBottom: "8px" }}>
              <div style={{ fontWeight: "bold", marginBottom: "2px" }}>
                Address:
              </div>
              <div>{resumeData?.personalInfo?.location || "Iran, Tehran"}</div>
            </div>
          </div>
        </div>

        {/* Highlights Section */}
        <div style={{ marginBottom: "25px" }}>
          <h2
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              color: "#ffffff",
              marginBottom: "12px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}>
            HIGHLIGHTS
          </h2>

          <div style={{ fontSize: "10px" }}>
            {resumeData?.skills?.length > 0 ? (
              resumeData.skills.map((skill: any, index: number) => (
                <div key={index} style={{ marginBottom: "12px" }}>
                  {skill.category && (
                    <div
                      style={{
                        fontWeight: "bold",
                        color: "#ecf0f1",
                        marginBottom: "6px",
                      }}>
                      {skill.category}
                    </div>
                  )}

                  {skill.items?.map((item: string, i: number) => (
                    <div
                      key={i}
                      style={{
                        color: "#bdc3c7",
                        marginBottom: "3px",
                        paddingLeft: "8px",
                        position: "relative",
                      }}>
                      <span
                        style={{
                          position: "absolute",
                          left: "0",
                          top: "0",
                        }}>
                        •
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <>
                <div
                  style={{
                    fontWeight: "bold",
                    color: "#ecf0f1",
                    marginBottom: "6px",
                  }}>
                  language
                </div>
                <div
                  style={{
                    color: "#bdc3c7",
                    marginBottom: "3px",
                    paddingLeft: "8px",
                    position: "relative",
                  }}>
                  <span style={{ position: "absolute", left: "0", top: "0" }}>
                    •
                  </span>
                  English
                </div>
                <div
                  style={{
                    color: "#bdc3c7",
                    marginBottom: "12px",
                    paddingLeft: "8px",
                    position: "relative",
                  }}>
                  <span style={{ position: "absolute", left: "0", top: "0" }}>
                    •
                  </span>
                  Persian
                </div>

                <div
                  style={{
                    fontWeight: "bold",
                    color: "#ecf0f1",
                    marginBottom: "6px",
                  }}>
                  technical
                </div>
                <div
                  style={{
                    color: "#bdc3c7",
                    marginBottom: "3px",
                    paddingLeft: "8px",
                    position: "relative",
                  }}>
                  <span style={{ position: "absolute", left: "0", top: "0" }}>
                    •
                  </span>
                  React.js
                </div>
                <div
                  style={{
                    color: "#bdc3c7",
                    marginBottom: "12px",
                    paddingLeft: "8px",
                    position: "relative",
                  }}>
                  <span style={{ position: "absolute", left: "0", top: "0" }}>
                    •
                  </span>
                  TypeScript
                </div>

                <div
                  style={{
                    fontWeight: "bold",
                    color: "#ecf0f1",
                    marginBottom: "6px",
                  }}>
                  soft
                </div>
                <div
                  style={{
                    color: "#bdc3c7",
                    marginBottom: "3px",
                    paddingLeft: "8px",
                    position: "relative",
                  }}>
                  <span style={{ position: "absolute", left: "0", top: "0" }}>
                    •
                  </span>
                  Leadership
                </div>
              </>
            )}
          </div>
        </div>

        {/* Achievements Section */}
        <div>
          <h2
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              color: "#ffffff",
              marginBottom: "12px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}>
            ACHIEVEMENTS
          </h2>

          <div style={{ fontSize: "10px" }}>
            {resumeData?.achievements?.length > 0 ? (
              resumeData.achievements
                .slice(0, 3)
                .map((achievement: any, index: number) => (
                  <div key={index} style={{ marginBottom: "10px" }}>
                    <div
                      style={{
                        fontWeight: "bold",
                        color: "#ecf0f1",
                        marginBottom: "2px",
                      }}>
                      {achievement.title}
                    </div>
                    {achievement.description && (
                      <div
                        style={{
                          color: "#bdc3c7",
                          lineHeight: "1.3",
                        }}>
                        {achievement.description}
                      </div>
                    )}
                  </div>
                ))
            ) : (
              <div style={{ marginBottom: "10px" }}>
                <div
                  style={{
                    fontWeight: "bold",
                    color: "#ecf0f1",
                    marginBottom: "2px",
                  }}>
                  Employee of the Year
                </div>
                <div
                  style={{
                    color: "#bdc3c7",
                    lineHeight: "1.3",
                  }}>
                  Description of Me: Being Employee of the Year
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
