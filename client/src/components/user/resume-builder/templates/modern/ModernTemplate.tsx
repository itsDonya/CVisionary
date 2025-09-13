import React from "react";
import type { Template } from "@/types/resume";
import type { Resume } from "@/types/resume";

interface ModernTemplateProps {
  template: Template;
  resume: Resume;
  customization?: any;
  isPreview?: boolean;
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({
  template,
  resume,
  customization,
  isPreview,
}) => {
  return (
    <div className="modern-template w-full max-w-4xl mx-auto bg-white">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">
            {resume.personalInfo?.firstName || "John"}{" "}
            {resume.personalInfo?.lastName || "Doe"}
          </h1>
          <h2 className="text-xl font-light opacity-90 mb-4">
            {resume.personalInfo?.title || "Professional Title"}
          </h2>

          {/* Contact Info */}
          <div className="flex flex-wrap gap-6 text-sm">
            {resume.personalInfo?.email && (
              <div className="flex items-center gap-2">
                <span>📧</span>
                <span>{resume.personalInfo.email}</span>
              </div>
            )}
            {resume.personalInfo?.phone && (
              <div className="flex items-center gap-2">
                <span>📱</span>
                <span>{resume.personalInfo.phone}</span>
              </div>
            )}
            {resume.personalInfo?.location && (
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>{resume.personalInfo.location}</span>
              </div>
            )}
            {resume.personalInfo?.website && (
              <div className="flex items-center gap-2">
                <span>🌐</span>
                <span>{resume.personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-8">
        {/* Professional Summary */}
        {resume.personalInfo?.summary && (
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
              Professional Summary
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {resume.personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience Section */}
        {resume.experiences && resume.experiences.length > 0 && (
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
              Professional Experience
            </h3>
            <div className="space-y-6">
              {resume?.experiences?.length &&
                resume?.experiences?.map((experience, index) => (
                  <div
                    key={experience.id || index}
                    className="border-l-4 border-blue-200 pl-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800">
                          {experience.position}
                        </h4>
                        <p className="text-lg text-blue-600 font-medium">
                          {experience.company}
                        </p>
                        {experience.location && (
                          <p className="text-gray-600">{experience.location}</p>
                        )}
                      </div>
                      <div className="text-right text-gray-600">
                        <p className="font-medium">
                          {experience.startDate} -{" "}
                          {experience.isCurrentJob
                            ? "Present"
                            : experience.endDate}
                        </p>
                      </div>
                    </div>

                    {experience.description && (
                      <p className="text-gray-700 mb-3 leading-relaxed">
                        {experience.description}
                      </p>
                    )}

                    {experience.achievements &&
                      experience.achievements.length > 0 && (
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          {experience.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      )}
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {resume.educations && resume.educations.length > 0 && (
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
              Education
            </h3>
            <div className="space-y-4">
              {resume.educations.length &&
                resume.educations.map((education, index) => (
                  <div
                    key={education.id || index}
                    className="border-l-4 border-blue-200 pl-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">
                          {education.degree}
                        </h4>
                        <p className="text-blue-600 font-medium">
                          {education.institution}
                        </p>
                        {education.location && (
                          <p className="text-gray-600">{education.location}</p>
                        )}
                      </div>
                      <div className="text-right text-gray-600">
                        <p className="font-medium">
                          {education.startDate} - {education.endDate}
                        </p>
                      </div>
                    </div>

                    {education.gpa && (
                      <p className="text-gray-700 mt-1">GPA: {education.gpa}</p>
                    )}

                    {education.description && (
                      <p className="text-gray-700 mt-2 leading-relaxed">
                        {education.description}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {resume.skills && resume.skills.length > 0 && (
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
              Skills
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resume.skills.map((skill, index) => (
                <div
                  key={skill.id || index}
                  className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {skill.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skill.items?.map((item, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements Section */}
        {resume.achievements && resume.achievements.length > 0 && (
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
              Achievements & Awards
            </h3>
            <div className="space-y-4">
              {resume.achievements.map((achievement, index) => (
                <div
                  key={achievement.id || index}
                  className="border-l-4 border-blue-200 pl-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        {achievement.title}
                      </h4>
                      {achievement.issuer && (
                        <p className="text-blue-600 font-medium">
                          {achievement.issuer}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 uppercase tracking-wide">
                        {achievement.category}
                      </p>
                    </div>
                    {achievement.date && (
                      <div className="text-right text-gray-600">
                        <p className="font-medium">{achievement.date}</p>
                      </div>
                    )}
                  </div>

                  {achievement.description && (
                    <p className="text-gray-700 mt-2 leading-relaxed">
                      {achievement.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        .modern-template {
          font-family: "Inter", "Segoe UI", sans-serif !important;
          background-color: #ffffff !important;
        }

        .modern-template header {
          background: linear-gradient(to right, #2563eb, #1d4ed8) !important;
          color: #ffffff !important;
        }

        .modern-template .border-blue-600 {
          border-color: #2563eb !important;
        }

        .modern-template .text-blue-600 {
          color: #2563eb !important;
        }

        .modern-template .bg-blue-100 {
          background-color: #dbeafe !important;
        }

        .modern-template .text-blue-800 {
          color: #1e40af !important;
        }

        .modern-template .bg-gray-50 {
          background-color: #f9fafb !important;
        }

        .modern-template .text-gray-800 {
          color: #1f2937 !important;
        }

        .modern-template .text-gray-700 {
          color: #374151 !important;
        }

        .modern-template .text-gray-600 {
          color: #4b5563 !important;
        }
      `}</style>
    </div>
  );
};
