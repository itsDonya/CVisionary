import React from "react";
import type { Template } from "@/types/resume";
import type { Resume } from "@/types/resume";

interface MinimalTemplateProps {
  template: Template;
  resume: Resume;
  customization?: any;
  isPreview?: boolean;
}

export const MinimalTemplate: React.FC<MinimalTemplateProps> = ({
  template,
  resume,
  customization,
  isPreview,
}) => {
  return (
    <div className="minimal-template w-full max-w-4xl mx-auto bg-white p-12">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-5xl font-thin text-gray-900 mb-2 tracking-tight">
          {resume.personalInfo?.firstName || "John"}{" "}
          {resume.personalInfo?.lastName || "Doe"}
        </h1>
        <h2 className="text-xl text-gray-600 font-light mb-6">
          {resume.personalInfo?.title || "Professional Title"}
        </h2>

        {/* Contact Info */}
        <div className="flex gap-8 text-sm text-gray-500">
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

      {/* Summary */}
      {resume.personalInfo?.summary && (
        <section className="mb-12">
          <p className="text-gray-700 leading-loose text-lg font-light">
            {resume.personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {resume.experiences && resume.experiences.length > 0 && (
        <section className="mb-12">
          <h3 className="text-sm font-medium text-gray-900 uppercase tracking-widest mb-8">
            Experience
          </h3>

          <div className="space-y-10">
            {resume.experiences.map((experience, index) => (
              <div key={experience.id || index}>
                <div className="flex justify-between items-baseline mb-4">
                  <div>
                    <h4 className="text-2xl font-light text-gray-900 mb-1">
                      {experience.position}
                    </h4>
                    <p className="text-gray-600 font-light">
                      {experience.company}
                      {experience.location && ` · ${experience.location}`}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 font-light">
                    {experience.startDate} —{" "}
                    {experience.isCurrentJob ? "Present" : experience.endDate}
                  </div>
                </div>

                {experience.description && (
                  <p className="text-gray-700 leading-relaxed mb-4 font-light">
                    {experience.description}
                  </p>
                )}

                {experience.achievements &&
                  experience.achievements.length > 0 && (
                    <ul className="space-y-2">
                      {experience.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="text-gray-700 font-light leading-relaxed">
                          — {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {resume.educations && resume.educations.length > 0 && (
        <section className="mb-12">
          <h3 className="text-sm font-medium text-gray-900 uppercase tracking-widest mb-8">
            Education
          </h3>

          <div className="space-y-6">
            {resume.educations.map((education, index) => (
              <div key={education.id || index}>
                <div className="flex justify-between items-baseline mb-2">
                  <div>
                    <h4 className="text-xl font-light text-gray-900">
                      {education.degree}
                    </h4>
                    <p className="text-gray-600 font-light">
                      {education.institution}
                      {education.location && ` · ${education.location}`}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 font-light">
                    {education.startDate} — {education.endDate}
                  </div>
                </div>

                {education.gpa && (
                  <p className="text-gray-600 text-sm font-light">
                    GPA: {education.gpa}
                  </p>
                )}

                {education.description && (
                  <p className="text-gray-700 leading-relaxed font-light mt-2">
                    {education.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <section className="mb-12">
          <h3 className="text-sm font-medium text-gray-900 uppercase tracking-widest mb-8">
            Skills
          </h3>

          <div className="space-y-4">
            {resume.skills.map((skill, index) => (
              <div key={skill.id || index}>
                <h4 className="text-lg font-light text-gray-900 mb-2">
                  {skill.category}
                </h4>
                <p className="text-gray-700 font-light">
                  {skill.items?.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {resume.achievements && resume.achievements.length > 0 && (
        <section>
          <h3 className="text-sm font-medium text-gray-900 uppercase tracking-widest mb-8">
            Achievements
          </h3>

          <div className="space-y-6">
            {resume.achievements.map((achievement, index) => (
              <div key={achievement.id || index}>
                <div className="flex justify-between items-baseline mb-2">
                  <div>
                    <h4 className="text-xl font-light text-gray-900">
                      {achievement.title}
                    </h4>
                    {achievement.issuer && (
                      <p className="text-gray-600 font-light">
                        {achievement.issuer}
                      </p>
                    )}
                  </div>
                  {achievement.date && (
                    <div className="text-sm text-gray-500 font-light">
                      {achievement.date}
                    </div>
                  )}
                </div>

                {achievement.description && (
                  <p className="text-gray-700 leading-relaxed font-light">
                    {achievement.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
