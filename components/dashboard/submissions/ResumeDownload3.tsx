"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

interface WorkExperience {
  jobTitle?: string;
  companyName?: string;
  startDate?: string;
  endDate?: string | null;
  location?: string;
  responsibilities?: string;
  achievements?: string;
  isCurrentRole?: boolean;
}

interface Education {
  degreeOrCertificate?: string;
  institutionName?: string;
  resultOrCGPA?: string;
  passingYear?: string;
  location?: string;
}

interface SkillData {
  name?: string;
  proficiency?: number;
  type?: string;
  isCustom?: boolean;
}

interface PersonalInfo {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  city_and_state?: string;
  professionalSummary?: string;
  resumeType?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
}

interface SubmissionInfo {
  personalInfo?: PersonalInfo;
  workExperiences?: WorkExperience[];
  educations?: Education[];
  skills?: SkillData[];
}

interface ApiItem {
  submission?: SubmissionInfo;
}

// Helper function to format period
const formatPeriod = (
  startDate: string | null | undefined,
  endDate: string | null | undefined,
  isCurrentRole?: boolean
): string => {
  if (!startDate) return "";
  // Extract just the year from the date
  const startYear = new Date(startDate).getFullYear();
  if (isCurrentRole || !endDate) {
    return `${startYear} - present`;
  }
  const endYear = new Date(endDate).getFullYear();
  return `${startYear} - ${endYear}`;
};

// Helper function to parse bullets from responsibilities and achievements
const parseBullets = (
  responsibilities?: string,
  achievements?: string
): string[] => {
  const bullets: string[] = [];

  if (responsibilities) {
    const respBullets = responsibilities
      .split(/\n|\.(?=\s|$)/)
      .map((b) => b.trim())
      .filter((b) => b.length > 0);
    bullets.push(...respBullets);
  }

  if (achievements) {
    const achBullets = achievements
      .split(/\n|\.(?=\s|$)/)
      .map((b) => b.trim())
      .filter((b) => b.length > 0);
    bullets.push(...achBullets);
  }

  return bullets.length > 0 ? bullets : ["No details provided"];
};

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 0,
    margin: 0,
    fontFamily: "Helvetica",
  },

  // Left Column (35% width, light gray background)
  leftColumn: {
    width: "35%",
    backgroundColor: "#F3F4F6",
    padding: 30,
    color: "#1F2937",
  },

  // Right Column (65% width, white background)
  rightColumn: {
    width: "65%",
    padding: 30,
    backgroundColor: "#FFFFFF",
  },

  // Name and Title Section in left column
  headerLeft: {
    marginBottom: 30,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  titlesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
    marginBottom: 4,
  },
  titleAccent: {
    width: 4,
    height: 12,
    backgroundColor: "#FF6B35", // Orange accent
    marginRight: 6,
  },
  title: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#4B5563",
    letterSpacing: 1,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  locationIcon: {
    fontSize: 9,
    marginRight: 4,
    color: "#6B7280",
  },
  location: {
    fontSize: 9,
    color: "#6B7280",
  },

  // Section Titles in left column
  sectionTitleLeft: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
    marginTop: 20,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
    letterSpacing: 1,
  },

  // Education items in left column
  educationItem: {
    marginBottom: 20,
  },
  educationHeader: {
    flexDirection: "row",
    marginBottom: 4,
  },
  educationLabel: {
    fontSize: 9,
    color: "#6B7280",
    marginRight: 4,
    fontWeight: "bold",
  },
  educationValue: {
    fontSize: 9,
    color: "#6B7280",
  },
  educationPeriod: {
    fontSize: 9,
    color: "#6B7280",
    marginBottom: 6,
  },
  educationCourse: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 2,
  },
  educationUniversity: {
    fontSize: 9,
    color: "#4B5563",
    marginBottom: 8,
  },
  educationDescription: {
    fontSize: 8,
    color: "#6B7280",
    lineHeight: 1.4,
    marginTop: 4,
  },

  // Skills section in left column
  skillsList: {
    marginBottom: 20,
  },
  skillItem: {
    fontSize: 9,
    color: "#4B5563",
    marginBottom: 5,
    paddingLeft: 0,
  },

  // Contact section in right column
  contactSection: {
    flexDirection: "row",
    marginBottom: 25,
    alignItems: "flex-start",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    backgroundColor: "#E5E7EB",
  },
  contactInfo: {
    flex: 1,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  contactIcon: {
    fontSize: 9,
    marginRight: 8,
    color: "#4B5563",
    width: 12,
  },
  contactText: {
    fontSize: 9,
    color: "#4B5563",
  },

  // Section Titles in right column
  sectionTitleRight: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
    marginTop: 20,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#111827",
    letterSpacing: 1,
  },

  // Profile text in right column
  profileText: {
    fontSize: 9,
    color: "#6B7280",
    lineHeight: 1.5,
    marginBottom: 20,
  },

  // Experience items in right column
  experienceItem: {
    marginBottom: 20,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  experienceLeft: {
    flex: 1,
  },
  jobPosition: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 2,
  },
  companyLocation: {
    fontSize: 9,
    color: "#4B5563",
  },
  experiencePeriod: {
    fontSize: 9,
    color: "#6B7280",
    fontStyle: "italic",
  },
  experienceDescription: {
    fontSize: 9,
    color: "#6B7280",
    lineHeight: 1.5,
    marginBottom: 8,
    marginTop: 6,
  },
  experienceHighlight: {
    fontSize: 9,
    color: "#4B5563",
    marginBottom: 3,
    paddingLeft: 0,
  },
});

// Helper function to format education date range
const formatEducationDateRange = (edu: Education): string => {
  if (!edu.passingYear) return "";
  // If passingYear contains a range like "2016-2018", return as is
  if (edu.passingYear.includes("-")) {
    return edu.passingYear;
  }
  // Otherwise, just return the year
  return edu.passingYear;
};

export const ResumePDF3 = ({ apiItem }: { apiItem: ApiItem | undefined }) => {
  // Extract data from API
  const submissionInfo = apiItem?.submission;
  const personalInfo = submissionInfo?.personalInfo;
  const workExperiences = submissionInfo?.workExperiences ?? [];
  const educations = submissionInfo?.educations ?? [];
  const skills = submissionInfo?.skills ?? [];

  // Get personal info with fallbacks
  const fullName = personalInfo?.fullName || "N/A";
  const location = personalInfo?.city_and_state || "N/A";
  const professionalSummary =
    personalInfo?.professionalSummary || "No summary provided";
  const email = personalInfo?.email || "";
  const phone = personalInfo?.phoneNumber || "";
  const linkedin = personalInfo?.linkedinUrl || "";
  const website = personalInfo?.websiteUrl || "";

  // Get job titles - can have multiple titles
  const jobTitles: string[] = [];
  if (personalInfo?.resumeType) {
    // Split resumeType by common separators to get multiple titles
    const titles = personalInfo.resumeType
      .split(/[,|/]/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    jobTitles.push(...titles);
  }
  // If no titles from resumeType, get from work experiences
  if (jobTitles.length === 0 && workExperiences.length > 0) {
    const firstJobTitle = workExperiences[0]?.jobTitle;
    if (firstJobTitle) {
      jobTitles.push(firstJobTitle);
    }
  }
  // Fallback
  if (jobTitles.length === 0) {
    jobTitles.push("Professional");
  }

  // Format work experiences
  const experiences = workExperiences.map((exp: WorkExperience) => ({
    company: exp.companyName || "N/A",
    position: exp.jobTitle || "N/A",
    location: exp.location || "",
    period: formatPeriod(exp.startDate, exp.endDate, exp.isCurrentRole),
    description: exp.responsibilities || "",
    bullets: parseBullets(exp.responsibilities, exp.achievements),
  }));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Column */}
        <View style={styles.leftColumn}>
          {/* Header with Name and Titles */}
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{fullName}</Text>

            {/* Multiple Titles with Orange Accent on First */}
            <View style={styles.titlesContainer}>
              {jobTitles.map((title, idx) => (
                <View key={idx} style={styles.titleRow}>
                  {idx === 0 && <View style={styles.titleAccent} />}
                  <Text style={styles.title}>{title.toUpperCase()}</Text>
                </View>
              ))}
            </View>

            {/* Location with Icon */}
            <View style={styles.locationContainer}>
              {/* <Text style={styles.locationIcon}>📍</Text> */}
              <Text style={styles.location}>{location}</Text>
            </View>
          </View>

          {/* Education Section */}
          {educations.length > 0 && (
            <>
              <Text style={styles.sectionTitleLeft}>EDUCATION</Text>
              {educations.map((edu: Education, idx: number) => (
                <View key={idx} style={styles.educationItem}>
                  {edu.passingYear && (
                    <Text style={styles.educationPeriod}>
                      {formatEducationDateRange(edu)}
                    </Text>
                  )}
                  <View style={styles.educationHeader}>
                    <Text style={styles.educationLabel}>Course:</Text>
                    <Text style={styles.educationValue}>
                      {edu.degreeOrCertificate || "N/A"}
                    </Text>
                  </View>
                  <View style={styles.educationHeader}>
                    <Text style={styles.educationLabel}>University:</Text>
                    <Text style={styles.educationValue}>
                      {edu.institutionName || "N/A"}
                    </Text>
                  </View>
                  {edu.resultOrCGPA && (
                    <Text style={styles.educationDescription}>
                      {edu.resultOrCGPA}
                    </Text>
                  )}
                </View>
              ))}
            </>
          )}

          {/* Skills Section */}
          {skills.length > 0 && (
            <>
              <Text style={styles.sectionTitleLeft}>SKILLS</Text>
              <View style={styles.skillsList}>
                {skills.map((skill: SkillData, idx: number) => (
                  <Text key={idx} style={styles.skillItem}>
                    • {skill.name || "N/A"}
                  </Text>
                ))}
              </View>
            </>
          )}
        </View>

        {/* Right Column */}
        <View style={styles.rightColumn}>
          {/* Contact Section with Profile Picture */}
          <View style={styles.contactSection}>
            {/* Profile Picture Placeholder */}
            <View style={styles.profileImage} />

            {/* Contact Information */}
            <View style={styles.contactInfo}>
              {email && (
                <View style={styles.contactItem}>
                  {/* <Text style={styles.contactIcon}>✉</Text> */}
                  <Text style={styles.contactText}>{email}</Text>
                </View>
              )}
              {phone && (
                <View style={styles.contactItem}>
                  {/* <Text style={styles.contactIcon}>📞</Text> */}
                  <Text style={styles.contactText}>{phone}</Text>
                </View>
              )}
              {linkedin && (
                <View style={styles.contactItem}>
                  {/* <Text style={styles.contactIcon}>💼</Text> */}
                  <Text style={styles.contactText}>
                    {linkedin.startsWith("http") ? linkedin : `www.${linkedin}`}
                  </Text>
                </View>
              )}
              {website && (
                <View style={styles.contactItem}>
                  {/* <Text style={styles.contactIcon}>🌐</Text> */}
                  <Text style={styles.contactText}>
                    {website.startsWith("http") ? website : `www.${website}`}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Profile Section */}
          <Text style={styles.sectionTitleRight}>PROFILE</Text>
          <Text style={styles.profileText}>{professionalSummary}</Text>

          {/* Experience Section */}
          {experiences.length > 0 && (
            <>
              <Text style={styles.sectionTitleRight}>EXPERIENCE</Text>
              {experiences.map((exp, idx) => (
                <View key={idx} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <View style={styles.experienceLeft}>
                      <Text style={styles.jobPosition}>{exp.position}</Text>
                      <Text style={styles.companyLocation}>
                        {exp.company}
                        {exp.location ? `, ${exp.location}` : ""}
                      </Text>
                    </View>
                    <Text style={styles.experiencePeriod}>{exp.period}</Text>
                  </View>
                  {exp.description && (
                    <Text style={styles.experienceDescription}>
                      {exp.description}
                    </Text>
                  )}
                  {exp.bullets.map((bullet, bulletIdx) => (
                    <Text key={bulletIdx} style={styles.experienceHighlight}>
                      • {bullet}
                    </Text>
                  ))}
                </View>
              ))}
            </>
          )}
        </View>
      </Page>
    </Document>
  );
};
