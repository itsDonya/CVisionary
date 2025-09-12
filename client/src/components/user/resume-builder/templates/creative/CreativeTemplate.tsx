import React from "react";
import type { Template } from "@/types/resume";
import type { Resume } from "@/types/resume";

interface CreativeTemplateProps {
  template: Template;
  resume: Resume;
  customization?: any;
  isPreview?: boolean;
}

export const CreativeTemplate: React.FC<CreativeTemplateProps> = ({
  template,
  resume,
  customization,
  isPreview,
}) => {
  return (
    <div className="creative-template w-full max-w-4xl mx-auto bg-white">
      <div className="grid grid-cols-3 gap-0">
        {/* Left Sidebar */}
        <div className="col-span-1 bg-gradient-to-b from-purple-600 to-purple-800 text-white p-6">
          {/* Profile Section */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold">
                {(resume.personalInfo?.firstName || "J")[0]}
                {(resume.personalInfo?.lastName || "D")[0]}
              </span>
            </div>
            <h1 className="text-xl font-bold mb-1">
              {resume.personalInfo?.firstName || "John"}{" "}
              {resume.personalInfo?.lastName || "Doe"}
            </h1>
            <p className="text-purple-200 text-sm">
              {resume.personalInfo?.title || "Creative Professional"}
            </p>
          </div>

          {/* Contact Info */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 text-purple-100">CONTACT</h3>
            <div className="space-y-3 text-sm">
              {resume.personalInfo?.email && (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-purple-300 rounded-full flex items-center justify-center text-xs">
                    @
                  </span>
                  <span className="break-all">{resume.personalInfo.email}</span>
                </div>
              )}
              {resume.personalInfo?.phone && (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-purple-300 rounded-full flex items-center justify-center text-xs">
                    📱
                  </span>
                  <span>{resume.personalInfo.phone}</span>
                </div>
              )}
              {resume.personalInfo?.location && (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-purple-300 rounded-full flex items-center justify-center text-xs">
                    📍
                  </span>
                  <span>{resume.personalInfo.location}</span>
                </div>
              )}
              {resume.personalInfo?.website && (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-purple-300 rounded-full flex items-center justify-center text-xs">
                    🌐
                  </span>
                  <span className="break-all">
                    {resume.personalInfo.website}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {resume.skills && resume.skills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 text-purple-100">SKILLS</h3>
              {resume.skills.map((skill, index) => (
                <div key={skill.id || index} className="mb-4">
                  <h4 className="font-semibold text-purple-200 mb-2 text-sm">
                    {skill.category}
                  </h4>
                  <div className="space-y-1">
                    {skill?.items?.length &&
                      skill.items.map((item, i) => (
                        <div key={i} className="text-xs">
                          <span className="bg-purple-500 text-white px-2 py-1 rounded-full">
                            {item}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {resume.educations && resume.educations.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-4 text-purple-100">
                EDUCATION
              </h3>
              {resume.educations.map((education, index) => (
                <div key={education.id || index} className="mb-4 last:mb-0">
                  <h4 className="font-semibold text-sm text-purple-100">
                    {education.degree}
                  </h4>
                  <p className="text-purple-200 text-xs mb-1">
                    {education.institution}
                  </p>
                  <p className="text-purple-300 text-xs">
                    {education.startDate} - {education.endDate}
                  </p>
                  {education.gpa && (
                    <p className="text-purple-300 text-xs">
                      GPA: {education.gpa}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="col-span-2 p-8">
          {/* Summary */}
          {resume.personalInfo?.summary && (
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-800">About Me</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {resume.personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {resume.experiences && resume.experiences.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-800">Experience</h2>
              </div>

              <div className="space-y-6">
                {resume.experiences.map((experience, index) => (
                  <div key={experience.id || index} className="relative">
                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                    <div className="pl-8">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {experience.position}
                          </h3>
                          <p className="text-purple-600 font-semibold">
                            {experience.company}
                          </p>
                          {experience.location && (
                            <p className="text-gray-600 text-sm">
                              {experience.location}
                            </p>
                          )}
                        </div>
                        <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1 rounded-full">
                          <p className="text-purple-700 text-sm font-medium">
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
                          <ul className="space-y-2">
                            {experience.achievements.map((achievement, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-gray-700">
                                <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Achievements */}
          {resume.achievements && resume.achievements.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Achievements
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {resume.achievements.map((achievement, index) => (
                  <div
                    key={achievement.id || index}
                    className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-l-4 border-purple-500">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">
                          {achievement.title}
                        </h4>
                        {achievement.issuer && (
                          <p className="text-purple-600 font-medium">
                            {achievement.issuer}
                          </p>
                        )}
                        <p className="text-xs text-purple-700 uppercase tracking-wide">
                          {achievement.category}
                        </p>
                      </div>
                      {achievement.date && (
                        <div className="bg-purple-200 px-2 py-1 rounded">
                          <p className="text-purple-800 text-sm font-medium">
                            {achievement.date}
                          </p>
                        </div>
                      )}
                    </div>

                    {achievement.description && (
                      <p className="text-gray-700 leading-relaxed">
                        {achievement.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
