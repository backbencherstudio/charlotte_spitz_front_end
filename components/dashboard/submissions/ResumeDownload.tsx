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
    zIndex: -1, // 👈 important
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

const experiences: ExperienceItem[] = [
  {
    company: "Uber",
    position: "Product Designer",
    period: "Mar 2018 - Present",
    bullets: [
      "Designed safety-focused experiences for Riders and Drivers",
      "Physical space problem solving and its interaction with the digital interface",
      "Navigated organization to achieve operational improvements",
    ],
  },
  {
    company: "IFTTT",
    position: "Product Designer",
    period: "Dec 2015 - Mar 2018",
    bullets: [
      "Product and system design for a complex product",
      "Collaborated with researchers and developers for IFTTT",
      "Responsible for maintaining design across iOS, Android, and web",
    ],
  },
  {
    company: "Facebook",
    position: "Product Designer",
    period: "June 2013 - Sep 2015",
    bullets: [
      "Designed and prototyped internal tools",
      "Partnered with many teams to build assets and features",
      "Authored/developed custom user experience for mobile",
    ],
  },
  {
    company: "Google Maps",
    position: "UX/UI Design Intern",
    period: "June 2012 - Sep 2012",
    bullets: [
      "Contributed to Maps on iOS wireframe and user experience",
      "Designed and prototyped onboarding experience",
      "Asset and feature design for Maps on Android",
    ],
  },
];

const skills: Skill[] = [
  { name: "Figma", proficiency: 90 },
  { name: "Sketch", proficiency: 85 },
  { name: "Adobe Photoshop", proficiency: 75 },
  { name: "Adobe Illustrator", proficiency: 70 },
  { name: "Principle", proficiency: 65 },
  { name: "Adobe XD", proficiency: 80 },
];

export const ResumePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
      {/* Background Image */}
      <Image
        src={image1.src}
        style={styles.backgroundImage}
      />
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>Rick Tang</Text>
          <Text style={styles.title}>Product Designer</Text>
          <Text style={styles.about}>
            {
              "I'm a UI/UX specialist focused on designing clean and functional projects across all platforms and devices in response to specific briefs and problems, while always maintaining a unique look and feel."
            }
          </Text>
        </View>

        <View style={styles.gridContainer}>
          {/* Left Column - Main Content */}
          <View style={styles.leftColumn}>
            {/* Experience Section */}
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

            {/* Education Section */}
            <Text style={[styles.sectionTitle, { marginTop: 15 }]}>
              Education
            </Text>
            <View style={styles.education}>
              <Text style={styles.university}>Brown University</Text>
              <Text style={styles.degree}>Interdisciplinary Studies</Text>
              <Text style={styles.period}>Sep 2010 - May 2012</Text>
            </View>
          </View>

          {/* Right Column - Sidebar */}
          <View style={styles.rightColumn}>
            {/* Details Section */}
            <Text style={styles.sectionTitle}>Details</Text>
            <Text style={styles.detailItem}>
              <Text style={styles.detailLabel}>Address: </Text>
              San Francisco, California
            </Text>
            <Text style={styles.detailItem}>
              <Text style={styles.detailLabel}>Phone: </Text>
              (303) 902-9179
            </Text>
            <Text style={styles.detailItem}>
              <Text style={styles.detailLabel}>Email: </Text>
              ricktang@gmail.com
            </Text>

            {/* Skills Section */}
            <Text style={[styles.sectionTitle, { marginTop: 15 }]}>Skills</Text>
            {skills.map((skill, idx) => (
              <View key={idx} style={styles.skillItem}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 2,
                  }}
                >
                  <Text style={styles.skillName}>{skill.name}</Text>
                  <Text style={styles.skillName}>{skill.proficiency}%</Text>
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

            {/* Links Section */}
            <Text style={[styles.sectionTitle, { marginTop: 15 }]}>Links</Text>
            <Text style={styles.linkItem}>LinkedIn</Text>
            <Text style={styles.linkItem}>Dribbble</Text>
            <Text style={styles.linkItem}>Behance</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);
