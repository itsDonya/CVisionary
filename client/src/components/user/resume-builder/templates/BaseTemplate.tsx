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

  // Use props resume if provided, otherwise use currentResume
  const resumeData = resume || currentResume;

  return (
    <div
      className={`resume-template bg-white text-black p-8 min-h-[297mm] w-[210mm] mx-auto shadow-lg ${className}`}
      data-template-id={template?.id}>
      {/* Header */}
      <div className="border-b-4 border-purple-600 pb-6 mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {resumeData.personalInfo?.firstName}{" "}
          {resumeData.personalInfo?.lastName}
        </h1>
        <p className="text-xl text-purple-600 mb-4">
          {resumeData.personalInfo?.title || "Professional"}
        </p>
        <div className="flex flex-wrap gap-4 text-gray-600">
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
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-purple-600 pl-3">
            About Me
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {resumeData.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {resumeData.experiences?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-purple-600 pl-3">
            Experience
          </h2>
          {resumeData.experiences.map((exp: any, index: number) => (
            <div key={index} className="mb-6 border-l-2 border-purple-200 pl-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {exp.position}
                  </h3>
                  <p className="text-purple-600 font-medium">{exp.company}</p>
                  {exp.location && (
                    <p className="text-gray-500 text-sm">{exp.location}</p>
                  )}
                </div>
                <div className="text-right text-gray-500">
                  <p className="font-medium">
                    {exp.startDate} -{" "}
                    {exp.isCurrentJob ? "Present" : exp.endDate}
                  </p>
                </div>
              </div>
              {exp.description && (
                <p className="text-gray-700 mb-3">{exp.description}</p>
              )}
              {exp.achievements?.length > 0 && (
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {exp.achievements.map((achievement: string, i: number) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {resumeData.skills?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-purple-600 pl-3">
            Skills
          </h2>
          {resumeData.skills.map((skill: any, index: number) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">
                {skill.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skill.items?.map((item: string, i: number) => (
                  <span
                    key={i}
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
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
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-purple-600 pl-3">
            Education
          </h2>
          {resumeData.educations.map((edu: any, index: number) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                  <p className="text-purple-600">{edu.institution}</p>
                </div>
                <div className="text-right text-gray-500">
                  <p>
                    {edu.startDate} - {edu.endDate}
                  </p>
                  {edu.gpa && <p>GPA: {edu.gpa}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {resumeData.achievements?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-purple-600 pl-3">
            Achievements
          </h2>
          {resumeData.achievements.map((achievement: any, index: number) => (
            <div key={index} className="mb-4 bg-purple-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {achievement.title}
                  </h3>
                  <p className="text-purple-600">{achievement.category}</p>
                  {achievement.issuer && (
                    <p className="text-gray-600 text-sm">
                      {achievement.issuer}
                    </p>
                  )}
                </div>
                {achievement.date && (
                  <span className="text-gray-500 text-sm">
                    {achievement.date}
                  </span>
                )}
              </div>
              {achievement.description && (
                <p className="text-gray-700 mt-2">{achievement.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BaseTemplate;
