// components/ResumePDF.tsx
"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import image1 from "@/public/images/11.png";

const styles = StyleSheet.create({
  page: {
    padding: 0,
    backgroundColor: "#f3f4f6",
    fontFamily: "Helvetica",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  container: {
    backgroundColor: "white",
    padding: 30,
    // borderRadius: 0,
    margin: 0,
    height: "100%",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  header: {
    marginBottom: 25,
    width: "100%",
    // borderBottom: "1px solid #e5e7eb",
    paddingBottom: 15,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 12,
  },
  about: {
    fontSize: 11,
    color: "#4b5563",
    lineHeight: 1.6,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 10,
    marginTop: 5,
    paddingBottom: 4,
    // borderBottom: "1px solid #e5e7eb",
  },
  experienceItem: {
    marginBottom: 18,
  },
  company: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  position: {
    fontSize: 12,
    color: "#374151",
    marginBottom: 2,
    fontStyle: "italic",
  },
  period: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 6,
  },
  bulletList: {
    marginLeft: 8,
    marginTop: 4,
  },
  bulletItem: {
    fontSize: 9,
    color: "#4b5563",
    lineHeight: 1.4,
    marginBottom: 3,
  },
  gridContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  leftColumn: {
    width: "66%",
    paddingRight: 15,
  },
  rightColumn: {
    width: "34%",
    paddingLeft: 15,
    // borderLeft: "1px solid #e5e7eb",
  },
  detailItem: {
    fontSize: 10,
    color: "#4b5563",
    marginBottom: 6,
    lineHeight: 1.4,
  },
  detailLabel: {
    fontWeight: "bold",
    fontSize: 10,
    color: "#1f2937",
  },
  skillItem: {
    marginBottom: 10,
  },
  skillName: {
    fontSize: 10,
    color: "#1f2937",
    marginBottom: 3,
  },
  skillBar: {
    height: 4,
    backgroundColor: "#e5e7eb",
    borderRadius: 2,
    overflow: "hidden",
  },
  skillFill: {
    height: "100%",
    backgroundColor: "#3b82f6",
    borderRadius: 2,
  },
  linkItem: {
    fontSize: 10,
    color: "#3b82f6",
    marginBottom: 4,
    textDecoration: "none",
  },
  education: {
    marginTop: 5,
  },
  university: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  degree: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 2,
  },
});

interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  bullets: string[];
}

interface Skill {
  name: string;
  proficiency: number;
}

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

// Helper function to format date
const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${month} ${year}`;
};

// Helper function to format period
const formatPeriod = (
  startDate: string | null | undefined,
  endDate: string | null | undefined,
  isCurrentRole?: boolean
): string => {
  if (!startDate) return "";
  const start = formatDate(startDate);
  if (isCurrentRole || !endDate) {
    return `${start} - Present`;
  }
  const end = formatDate(endDate);
  return `${start} - ${end}`;
};

// Helper function to parse bullets from responsibilities and achievements
const parseBullets = (
  responsibilities?: string,
  achievements?: string
): string[] => {
  const bullets: string[] = [];

  if (responsibilities) {
    // Split by newlines or periods and filter empty strings
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

export const ResumePDF = ({ apiItem }: { apiItem: ApiItem | undefined }) => {
  // Extract data from API
  const submissionInfo = apiItem?.submission;
  const personalInfo = submissionInfo?.personalInfo;
  const workExperiences = submissionInfo?.workExperiences ?? [];
  const educations = submissionInfo?.educations ?? [];
  const skills = submissionInfo?.skills ?? [];

  // Format work experiences
  const experiences: ExperienceItem[] = workExperiences.map(
    (exp: WorkExperience) => ({
      company: exp.companyName || "N/A",
      position: exp.jobTitle || "N/A",
      period: formatPeriod(exp.startDate, exp.endDate, exp.isCurrentRole),
      bullets: parseBullets(exp.responsibilities, exp.achievements),
    })
  );

  // Format skills with default proficiency
  const formattedSkills: Skill[] = skills.map((skill: SkillData) => ({
    name: skill.name || "N/A",
    proficiency: skill.proficiency || 75, // Default proficiency if not provided
  }));

  // Get personal info with fallbacks
  const fullName = personalInfo?.fullName || "N/A";
  const email = personalInfo?.email || "N/A";
  const phone = personalInfo?.phoneNumber || "N/A";
  const location = personalInfo?.city_and_state || "N/A";
  const professionalSummary =
    personalInfo?.professionalSummary || "No summary provided";

  // Get job title from first work experience or use a default
  const jobTitle =
    workExperiences[0]?.jobTitle || personalInfo?.resumeType || "Professional";

  // Get links
  const linkedinUrl = personalInfo?.linkedinUrl;
  const websiteUrl = personalInfo?.websiteUrl;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          {/* Background Image */}
          <Image src={image1.src} style={styles.backgroundImage} />
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.name}>{fullName}</Text>
            <Text style={styles.title}>{jobTitle}</Text>
            <Text style={styles.about}>{professionalSummary}</Text>
          </View>

          <View style={styles.gridContainer}>
            {/* Left Column - Main Content */}
            <View style={styles.leftColumn}>
              {/* Experience Section */}
              {experiences.length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>Experience</Text>
                  {experiences.map((exp, idx) => (
                    <View key={idx} style={styles.experienceItem}>
                      <Text style={styles.company}>{exp.company}</Text>
                      <Text style={styles.position}>{exp.position}</Text>
                      <Text style={styles.period}>{exp.period}</Text>
                      <View style={styles.bulletList}>
                        {exp.bullets.map((bullet, bulletIdx) => (
                          <Text key={bulletIdx} style={styles.bulletItem}>
                            • {bullet}
                          </Text>
                        ))}
                      </View>
                    </View>
                  ))}
                </>
              )}

              {/* Education Section */}
              {educations.length > 0 && (
                <>
                  <Text style={[styles.sectionTitle, { marginTop: 15 }]}>
                    Education
                  </Text>
                  {educations.map((edu: Education, idx: number) => (
                    <View key={idx} style={styles.education}>
                      <Text style={styles.university}>
                        {edu.institutionName || "N/A"}
                      </Text>
                      <Text style={styles.degree}>
                        {edu.degreeOrCertificate || "N/A"}
                      </Text>
                      {edu.passingYear && (
                        <Text style={styles.period}>{edu.passingYear}</Text>
                      )}
                    </View>
                  ))}
                </>
              )}
            </View>

            {/* Right Column - Sidebar */}
            <View style={styles.rightColumn}>
              {/* Details Section */}
              <Text style={styles.sectionTitle}>Details</Text>
              <Text style={styles.detailItem}>
                <Text style={styles.detailLabel}>Address: </Text>
                {location}
              </Text>
              <Text style={styles.detailItem}>
                <Text style={styles.detailLabel}>Phone: </Text>
                {phone}
              </Text>
              <Text style={styles.detailItem}>
                <Text style={styles.detailLabel}>Email: </Text>
                {email}
              </Text>

              {/* Skills Section */}
              {formattedSkills.length > 0 && (
                <>
                  <Text style={[styles.sectionTitle, { marginTop: 15 }]}>
                    Skills
                  </Text>
                  {formattedSkills.map((skill, idx) => (
                    <View key={idx} style={styles.skillItem}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: 2,
                        }}
                      >
                        <Text style={styles.skillName}>{skill.name}</Text>
                        <Text style={styles.skillName}>
                          {skill.proficiency}%
                        </Text>
                      </View>
                      <View style={styles.skillBar}>
                        <View
                          style={[
                            styles.skillFill,
                            { width: `${skill.proficiency}%` },
                          ]}
                        />
                      </View>
                    </View>
                  ))}
                </>
              )}

              {/* Links Section */}
              {(linkedinUrl || websiteUrl) && (
                <>
                  <Text style={[styles.sectionTitle, { marginTop: 15 }]}>
                    Links
                  </Text>
                  {linkedinUrl && <Text style={styles.linkItem}>LinkedIn</Text>}
                  {websiteUrl && <Text style={styles.linkItem}>Website</Text>}
                </>
              )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
