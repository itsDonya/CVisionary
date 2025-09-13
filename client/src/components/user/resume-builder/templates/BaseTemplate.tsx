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
      className={`resume-template bg-white text-black min-h-screen w-full max-w-none ${className}`}
      style={{
        width: "210mm",
        minHeight: "297mm",
        padding: "20mm",
        margin: "0 auto",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        fontSize: "12px",
        lineHeight: "1.6",
        color: "#000000",
        overflow: "visible",
      }}
      data-template-id={template?.id}>
      {/* Header */}
      <div
        style={{
          borderBottom: "4px solid #8b5cf6",
          paddingBottom: "24px",
          marginBottom: "32px",
        }}>
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            color: "#1f2937",
            margin: "0 0 8px 0",
          }}>
          {resumeData.personalInfo?.firstName}{" "}
          {resumeData.personalInfo?.lastName}
        </h1>
        <p
          style={{
            fontSize: "20px",
            color: "#8b5cf6",
            margin: "0 0 16px 0",
          }}>
          {resumeData.personalInfo?.title || "Professional"}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            color: "#6b7280",
          }}>
          {resumeData.personalInfo?.email && (
            <span>📧 {resumeData.personalInfo.email}</span>
          )}
          {resumeData.personalInfo?.phone && (
            <span>📱 {resumeData.personalInfo.phone}</span>
          )}
          {resumeData.personalInfo?.location && (
            <span>📍 {resumeData.personalInfo.location}</span>
          )}
        </div>
      </div>

      {/* Summary */}
      {resumeData.personalInfo?.summary && (
        <div style={{ marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#1f2937",
              margin: "0 0 16px 0",
              borderLeft: "4px solid #8b5cf6",
              paddingLeft: "12px",
            }}>
            About Me
          </h2>
          <p
            style={{
              color: "#374151",
              lineHeight: "1.7",
              margin: "0",
            }}>
            {resumeData.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {resumeData.experiences?.length > 0 && (
        <div style={{ marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#1f2937",
              margin: "0 0 24px 0",
              borderLeft: "4px solid #8b5cf6",
              paddingLeft: "12px",
            }}>
            Experience
          </h2>
          {resumeData.experiences.map((exp: any, index: number) => (
            <div
              key={index}
              style={{
                marginBottom: "24px",
                borderLeft: "2px solid #e5e7eb",
                paddingLeft: "24px",
              }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "8px",
                }}>
                <div>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#1f2937",
                      margin: "0 0 4px 0",
                    }}>
                    {exp.position}
                  </h3>
                  <p
                    style={{
                      color: "#8b5cf6",
                      fontWeight: "500",
                      margin: "0 0 4px 0",
                    }}>
                    {exp.company}
                  </p>
                  {exp.location && (
                    <p
                      style={{
                        color: "#6b7280",
                        fontSize: "14px",
                        margin: "0",
                      }}>
                      {exp.location}
                    </p>
                  )}
                </div>
                <div
                  style={{
                    textAlign: "right",
                    color: "#6b7280",
                  }}>
                  <p
                    style={{
                      fontWeight: "500",
                      margin: "0",
                    }}>
                    {exp.startDate} -{" "}
                    {exp.isCurrentJob ? "Present" : exp.endDate}
                  </p>
                </div>
              </div>
              {exp.description && (
                <p
                  style={{
                    color: "#374151",
                    margin: "0 0 12px 0",
                  }}>
                  {exp.description}
                </p>
              )}
              {exp.achievements?.length > 0 && (
                <ul
                  style={{
                    listStyle: "disc",
                    paddingLeft: "20px",
                    margin: "0",
                    color: "#374151",
                  }}>
                  {exp.achievements.map((achievement: string, i: number) => (
                    <li key={i} style={{ marginBottom: "4px" }}>
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
        <div style={{ marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#1f2937",
              margin: "0 0 16px 0",
              borderLeft: "4px solid #8b5cf6",
              paddingLeft: "12px",
            }}>
            Skills
          </h2>
          {resumeData.skills.map((skill: any, index: number) => (
            <div key={index} style={{ marginBottom: "16px" }}>
              <h3
                style={{
                  fontWeight: "600",
                  color: "#1f2937",
                  margin: "0 0 8px 0",
                }}>
                {skill.category}
              </h3>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                }}>
                {skill.items?.map((item: string, i: number) => (
                  <span
                    key={i}
                    style={{
                      backgroundColor: "#f3e8ff",
                      color: "#7c3aed",
                      padding: "4px 12px",
                      borderRadius: "9999px",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resumeData.educations?.length > 0 && (
        <div style={{ marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#1f2937",
              margin: "0 0 16px 0",
              borderLeft: "4px solid #8b5cf6",
              paddingLeft: "12px",
            }}>
            Education
          </h2>
          {resumeData.educations.map((edu: any, index: number) => (
            <div key={index} style={{ marginBottom: "16px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}>
                <div>
                  <h3
                    style={{
                      fontWeight: "600",
                      color: "#1f2937",
                      margin: "0 0 4px 0",
                    }}>
                    {edu.degree}
                  </h3>
                  <p
                    style={{
                      color: "#8b5cf6",
                      margin: "0",
                    }}>
                    {edu.institution}
                  </p>
                </div>
                <div
                  style={{
                    textAlign: "right",
                    color: "#6b7280",
                  }}>
                  <p style={{ margin: "0 0 4px 0" }}>
                    {edu.startDate} - {edu.endDate}
                  </p>
                  {edu.gpa && <p style={{ margin: "0" }}>GPA: {edu.gpa}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {resumeData.achievements?.length > 0 && (
        <div>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#1f2937",
              margin: "0 0 16px 0",
              borderLeft: "4px solid #8b5cf6",
              paddingLeft: "12px",
            }}>
            Achievements
          </h2>
          {resumeData.achievements.map((achievement: any, index: number) => (
            <div
              key={index}
              style={{
                marginBottom: "16px",
                backgroundColor: "#f8fafc",
                padding: "16px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
              }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}>
                <div>
                  <h3
                    style={{
                      fontWeight: "600",
                      color: "#1f2937",
                      margin: "0 0 4px 0",
                    }}>
                    {achievement.title}
                  </h3>
                  <p
                    style={{
                      color: "#8b5cf6",
                      margin: "0 0 4px 0",
                    }}>
                    {achievement.category}
                  </p>
                  {achievement.issuer && (
                    <p
                      style={{
                        color: "#6b7280",
                        fontSize: "14px",
                        margin: "0",
                      }}>
                      {achievement.issuer}
                    </p>
                  )}
                </div>
                {achievement.date && (
                  <span
                    style={{
                      color: "#6b7280",
                      fontSize: "14px",
                    }}>
                    {achievement.date}
                  </span>
                )}
              </div>
              {achievement.description && (
                <p
                  style={{
                    color: "#374151",
                    marginTop: "8px",
                    margin: "8px 0 0 0",
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

export default BaseTemplate;
