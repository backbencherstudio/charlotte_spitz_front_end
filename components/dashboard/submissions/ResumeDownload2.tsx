"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import image1 from "@/public/images/image 265.png";

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
    return `${start} – Present`;
  }
  const end = formatDate(endDate);
  return `${start} – ${end}`;
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

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },

  /* LEFT SIDEBAR */
  sidebar: {
    width: "35%",
    backgroundColor: "#145349",
    padding: 24,
    color: "#ffffff",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    alignSelf: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  role: {
    fontSize: 10,
    textAlign: "center",
    color: "#d1d5db",
    marginBottom: 18,
  },
  sidebarTitle: {
    fontSize: 10,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
    marginTop: 16,
  },
  sidebarText: {
    fontSize: 9,
    color: "#e5e7eb",
    marginBottom: 4,
  },

  skillItem: {
    marginBottom: 8,
  },
  skillName: {
    fontSize: 9,
    marginBottom: 3,
  },
  skillBar: {
    height: 3,
    backgroundColor: "#3f6f68",
  },
  skillFill: {
    height: "100%",
    backgroundColor: "#ffffff",
  },

  /* RIGHT CONTENT */
  content: {
    width: "65%",
    padding: 28,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 10,
    color: "#4b5563",
    lineHeight: 1.5,
    marginBottom: 16,
  },

  experienceItem: {
    marginBottom: 14,
  },
  company: {
    fontSize: 11,
    fontWeight: "bold",
  },
  position: {
    fontSize: 10,
    color: "#4b5563",
  },
  period: {
    fontSize: 9,
    color: "#9ca3af",
    marginBottom: 4,
  },
  bullet: {
    fontSize: 9,
    color: "#4b5563",
    marginLeft: 8,
    marginBottom: 2,
  },

  educationTitle: {
    fontSize: 11,
    fontWeight: "bold",
  },
  educationText: {
    fontSize: 9,
    color: "#6b7280",
  },
});

export const ResumePDF2 = ({ apiItem }: { apiItem: ApiItem | undefined }) => {
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
    proficiency: skill.proficiency || 75,
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

  // Format education period
  const formatEducationPeriod = (edu: Education): string => {
    if (!edu.passingYear) return "";
    return edu.passingYear;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* LEFT SIDEBAR */}
        <View style={styles.sidebar}>
          <Image src={image1.src} style={styles.avatar} />

          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.role}>{jobTitle}</Text>

          <Text style={styles.sidebarTitle}>Details</Text>
          <Text style={styles.sidebarText}>{location}</Text>
          <Text style={styles.sidebarText}>{phone}</Text>
          <Text style={styles.sidebarText}>{email}</Text>

          {(linkedinUrl || websiteUrl) && (
            <>
              <Text style={styles.sidebarTitle}>Links</Text>
              {linkedinUrl && <Text style={styles.sidebarText}>LinkedIn</Text>}
              {websiteUrl && <Text style={styles.sidebarText}>Website</Text>}
            </>
          )}

          {formattedSkills.length > 0 && (
            <>
              <Text style={styles.sidebarTitle}>Skills</Text>
              {formattedSkills.map((skill, i) => (
                <View key={i} style={styles.skillItem}>
                  <Text style={styles.skillName}>{skill.name}</Text>
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
        </View>

        {/* RIGHT CONTENT */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <Text style={styles.paragraph}>{professionalSummary}</Text>

          {experiences.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Experience</Text>
              {experiences.map((exp, i) => (
                <View key={i} style={styles.experienceItem}>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.position}>{exp.position}</Text>
                  <Text style={styles.period}>{exp.period}</Text>
                  {exp.bullets.map((b, j) => (
                    <Text key={j} style={styles.bullet}>
                      • {b}
                    </Text>
                  ))}
                </View>
              ))}
            </>
          )}

          {educations.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Education</Text>
              {educations.map((edu: Education, idx: number) => (
                <View key={idx}>
                  <Text style={styles.educationTitle}>
                    {edu.institutionName || "N/A"}
                  </Text>
                  <Text style={styles.educationText}>
                    {edu.degreeOrCertificate || "N/A"}
                    {edu.passingYear && ` · ${formatEducationPeriod(edu)}`}
                  </Text>
                </View>
              ))}
            </>
          )}
        </View>
      </Page>
    </Document>
  );
};
