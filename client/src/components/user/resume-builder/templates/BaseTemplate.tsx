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
      id="resume-preview"
      className={`bg-white min-h-[297mm] w-[210mm] mx-auto shadow-xl ${className}`}
      style={{
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        lineHeight: "1.6",
        color: "#2d3748",
        padding: "5mm", // کاهش از 20mm به 15mm
        boxSizing: "border-box",
      }}>
      {/* Header */}
      <div
        style={{
          borderBottom: "3px solid #2d3748",
          paddingBottom: "20px",
          marginBottom: "30px",
        }}>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#1a202c",
            margin: "0 0 8px 0",
            letterSpacing: "1px",
          }}>
          {resumeData.personalInfo?.firstName}{" "}
          {resumeData.personalInfo?.lastName}
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "#4a5568",
            margin: "0 0 15px 0",
            fontWeight: "500",
          }}>
          {resumeData.personalInfo?.title || "Professional"}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            fontSize: "13px",
            color: "#718096",
          }}>
          {resumeData.personalInfo?.email && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontWeight: "bold" }}>📧</span>
              <span>{resumeData.personalInfo.email}</span>
            </div>
          )}
          {resumeData.personalInfo?.phone && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontWeight: "bold" }}>📱</span>
              <span>{resumeData.personalInfo.phone}</span>
            </div>
          )}
          {resumeData.personalInfo?.location && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontWeight: "bold" }}>📍</span>
              <span>{resumeData.personalInfo.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {resumeData.personalInfo?.summary && (
        <div style={{ marginBottom: "35px" }}>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#1a202c",
              margin: "0 0 12px 0",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              borderLeft: "4px solid #2d3748",
              paddingLeft: "12px",
            }}>
            Professional Summary
          </h2>
          <p
            style={{
              margin: "0",
              textAlign: "justify",
              backgroundColor: "#f7fafc",
              padding: "15px",
              border: "1px solid #e2e8f0",
              borderRadius: "4px",
            }}>
            {resumeData.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {resumeData.experiences?.length > 0 && (
        <div style={{ marginBottom: "35px" }}>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#1a202c",
              margin: "0 0 20px 0",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              borderLeft: "4px solid #2d3748",
              paddingLeft: "12px",
            }}>
            Professional Experience
          </h2>
          {resumeData.experiences.map((exp: any, index: number) => (
            <div
              key={index}
              style={{
                marginBottom: "25px",
                border: "1px solid #e2e8f0",
                borderRadius: "4px",
                padding: "20px",
                backgroundColor: "#fdfdfd",
              }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "12px",
                  flexWrap: "wrap",
                  gap: "10px",
                }}>
                <div>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#1a202c",
                      margin: "0 0 4px 0",
                    }}>
                    {exp.position}
                  </h3>
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#2d3748",
                      margin: "0 0 4px 0",
                    }}>
                    {exp.company}
                  </p>
                  {exp.location && (
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#718096",
                        margin: "0",
                        fontStyle: "italic",
                      }}>
                      {exp.location}
                    </p>
                  )}
                </div>
                <div
                  style={{
                    backgroundColor: "#2d3748",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                  }}>
                  {exp.startDate} - {exp.isCurrentJob ? "Present" : exp.endDate}
                </div>
              </div>
              {exp.description && (
                <p
                  style={{
                    margin: "0 0 12px 0",
                    color: "#4a5568",
                    textAlign: "justify",
                  }}>
                  {exp.description}
                </p>
              )}
              {exp.achievements?.length > 0 && (
                <ul
                  style={{
                    margin: "0",
                    padding: "0 0 0 20px",
                    listStyleType: "none",
                  }}>
                  {exp.achievements.map((achievement: string, i: number) => (
                    <li
                      key={i}
                      style={{
                        marginBottom: "6px",
                        color: "#4a5568",
                        position: "relative",
                      }}>
                      <span
                        style={{
                          content: "",
                          position: "absolute",
                          left: "-15px",
                          top: "8px",
                          width: "6px",
                          height: "6px",
                          backgroundColor: "#2d3748",
                          borderRadius: "50%",
                        }}>
                        •
                      </span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {resumeData.skills?.length > 0 && (
        <div style={{ marginBottom: "35px" }}>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#1a202c",
              margin: "0 0 20px 0",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              borderLeft: "4px solid #2d3748",
              paddingLeft: "12px",
            }}>
            Core Skills
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}>
            {resumeData.skills.map((skill: any, index: number) => (
              <div
                key={index}
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "4px",
                  padding: "15px",
                  backgroundColor: "#fdfdfd",
                }}>
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#1a202c",
                    margin: "0 0 10px 0",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}>
                  {skill.category}
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                  }}>
                  {skill.items?.map((item: string, i: number) => (
                    <span
                      key={i}
                      style={{
                        backgroundColor: "#2d3748",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resumeData.educations?.length > 0 && (
        <div style={{ marginBottom: "35px" }}>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#1a202c",
              margin: "0 0 20px 0",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              borderLeft: "4px solid #2d3748",
              paddingLeft: "12px",
            }}>
            Education
          </h2>
          {resumeData.educations.map((edu: any, index: number) => (
            <div
              key={index}
              style={{
                marginBottom: "20px",
                border: "1px solid #e2e8f0",
                borderRadius: "4px",
                padding: "20px",
                backgroundColor: "#fdfdfd",
              }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "10px",
                }}>
                <div>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#1a202c",
                      margin: "0 0 4px 0",
                    }}>
                    {edu.degree}
                  </h3>
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#2d3748",
                      margin: "0",
                    }}>
                    {edu.institution}
                  </p>
                </div>
                <div>
                  <div
                    style={{
                      backgroundColor: "#2d3748",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}>
                    {edu.startDate} - {edu.endDate}
                  </div>
                  {edu.gpa && (
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#718096",
                        textAlign: "center",
                        marginTop: "4px",
                      }}>
                      GPA: {edu.gpa}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {resumeData.achievements?.length > 0 && (
        <div style={{ marginBottom: "35px" }}>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#1a202c",
              margin: "0 0 20px 0",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              borderLeft: "4px solid #2d3748",
              paddingLeft: "12px",
            }}>
            Achievements & Awards
          </h2>
          {resumeData.achievements.map((achievement: any, index: number) => (
            <div
              key={index}
              style={{
                marginBottom: "20px",
                border: "1px solid #e2e8f0",
                borderRadius: "4px",
                padding: "20px",
                backgroundColor: "#fdfdfd",
              }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginBottom: "10px",
                }}>
                <div>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#1a202c",
                      margin: "0 0 4px 0",
                    }}>
                    {achievement.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#2d3748",
                      margin: "0 0 4px 0",
                    }}>
                    {achievement.issuer}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#718096",
                      margin: "0",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}>
                    {achievement.category}
                  </p>
                </div>
                {achievement.date && (
                  <div
                    style={{
                      backgroundColor: "#2d3748",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}>
                    {achievement.date}
                  </div>
                )}
              </div>
              {achievement.description && (
                <p
                  style={{
                    margin: "0",
                    color: "#4a5568",
                    textAlign: "justify",
                  }}>
                  {achievement.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
