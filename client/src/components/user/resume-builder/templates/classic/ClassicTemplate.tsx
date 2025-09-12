import React from "react";
import type { Template } from "@/types/resume";
import type { Resume } from "@/types/resume";

interface ClassicTemplateProps {
  template: Template;
  resume: Resume;
  customization?: any;
  isPreview?: boolean;
}

export const ClassicTemplate: React.FC<ClassicTemplateProps> = ({
  template,
  resume,
  customization,
  isPreview,
}) => {
  return (
    <div className="classic-template w-full max-w-4xl mx-auto bg-white p-8">
      {/* Header */}
      <header className="text-center border-b-2 border-gray-800 pb-6 mb-8">
        <h1 className="text-4xl font-serif font-bold text-gray-800 mb-2">
          {resume.personalInfo?.firstName || "John"}{" "}
          {resume.personalInfo?.lastName || "Doe"}
        </h1>
        <h2 className="text-xl text-gray-600 mb-4">
          {resume.personalInfo?.title || "Professional Title"}
        </h2>

        {/* Contact Info */}
        <div className="flex justify-center gap-8 text-sm text-gray-600">
          {resume.personalInfo?.email && (
            <span>{resume.personalInfo.email}</span>
          )}
          {resume.personalInfo?.phone && (
            <span>{resume.personalInfo.phone}</span>
          )}
          {resume.personalInfo?.location && (
            <span>{resume.personalInfo.location}</span>
          )}
          {resume.personalInfo?.website && (
            <span>{resume.personalInfo.website}</span>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {resume.personalInfo?.summary && (
        <section className="mb-8">
          <h3 className="text-xl font-serif font-bold text-gray-800 mb-3 uppercase tracking-wider">
            Professional Summary
          </h3>
          <p className="text-gray-700 leading-relaxed text-justify">
            {resume.personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {resume.experiences && resume.experiences.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-serif font-bold text-gray-800 mb-4 uppercase tracking-wider">
            Professional Experience
          </h3>
          {resume.experiences.map((experience, index) => (
            <div key={experience.id || index} className="mb-6 last:mb-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {experience.position}
                  </h4>
                  <p className="text-gray-600 font-medium italic">
                    {experience.company}
                    {experience.location && ` • ${experience.location}`}
                  </p>
                </div>
                <div className="text-right text-gray-600 text-sm">
                  <p className="font-medium">
                    {experience.startDate} -{" "}
                    {experience.isCurrentJob ? "Present" : experience.endDate}
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
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    {experience.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {resume.educations && resume.educations.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-serif font-bold text-gray-800 mb-4 uppercase tracking-wider">
            Education
          </h3>
          {resume.educations.map((education, index) => (
            <div key={education.id || index} className="mb-4 last:mb-0">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {education.degree}
                  </h4>
                  <p className="text-gray-600 italic">
                    {education.institution}
                    {education.location && ` • ${education.location}`}
                  </p>
                  {education.gpa && (
                    <p className="text-gray-600 text-sm">
                      GPA: {education.gpa}
                    </p>
                  )}
                </div>
                <div className="text-right text-gray-600 text-sm">
                  <p className="font-medium">
                    {education.startDate} - {education.endDate}
                  </p>
                </div>
              </div>

              {education.description && (
                <p className="text-gray-700 mt-2 leading-relaxed">
                  {education.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-serif font-bold text-gray-800 mb-4 uppercase tracking-wider">
            Skills & Competencies
          </h3>
          {resume.skills.map((skill, index) => (
            <div key={skill.id || index} className="mb-3">
              <h4 className="font-semibold text-gray-800 mb-1">
                {skill.category}:
              </h4>
              <p className="text-gray-700">{skill.items?.join(" • ")}</p>
            </div>
          ))}
        </section>
      )}

      {/* Achievements */}
      {resume.achievements && resume.achievements.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-serif font-bold text-gray-800 mb-4 uppercase tracking-wider">
            Achievements & Awards
          </h3>
          {resume.achievements.map((achievement, index) => (
            <div key={achievement.id || index} className="mb-4 last:mb-0">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {achievement.title}
                  </h4>
                  {achievement.issuer && (
                    <p className="text-gray-600 italic">{achievement.issuer}</p>
                  )}
                  <p className="text-sm text-gray-600 uppercase tracking-wide">
                    {achievement.category}
                  </p>
                </div>
                {achievement.date && (
                  <div className="text-right text-gray-600 text-sm">
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
        </section>
      )}
    </div>
  );
};
