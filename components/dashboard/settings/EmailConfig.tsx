"use client";

import { useState } from "react";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useUpdateSettingsMutation } from "@/src/redux/features/setting";

export default function EmailConfig() {
  const [smtpProvider, setSmtpProvider] = useState("");
  const [smtpPort, setSmtpPort] = useState("");
  const [smtpHost, setSmtpHost] = useState("");
  const [smtpEncryption, setSmtpEncryption] = useState("");
  const [smtpFromEmail, setSmtpFromEmail] = useState("");
  const [smtpFromName, setSmtpFromName] = useState("");

  const [updateSettings, { isLoading }] = useUpdateSettingsMutation();

  const handleSave = async () => {
    const data = {
      smtpProvider,
      smtpPort: Number(smtpPort),
      smtpHost,
      smtpEncryption,
      smtpFromEmail,
      smtpFromName,
    };
    try {
      await updateSettings(data);
      // toast.success("Settings updated successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CardHeader className="pt-5">
        <div>
          <CardTitle className="text-2xl font-bold mb-2">
            Email & SMTP Configuration
          </CardTitle>
          <CardDescription>
            Configure email settings and SMTP server
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="smtp-provider">SMTP Provider</Label>
              <Select value={smtpProvider} onValueChange={setSmtpProvider}>
                <SelectTrigger
                  id="smtp-provider"
                  className="w-full bg-background"
                >
                  <SelectValue placeholder="Select Provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gmail">Gmail</SelectItem>
                  <SelectItem value="outlook">Outlook</SelectItem>
                  <SelectItem value="sendgrid">SendGrid</SelectItem>
                  <SelectItem value="mailgun">Mailgun</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="smtp-port">SMTP Port</Label>
              <Input
                id="smtp-port"
                placeholder="Enter SMTP port"
                type="text"
                value={smtpPort}
                onChange={(e) => setSmtpPort(e.target.value)}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="smtp-host">SMTP Host</Label>
              <Input
                id="smtp-host"
                type="text"
                value={smtpHost}
                onChange={(e) => setSmtpHost(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="smtpEncryption">smtpEncryption</Label>
              <Select value={smtpEncryption} onValueChange={setSmtpEncryption}>
                <SelectTrigger
                  id="smtpEncryption"
                  className="w-full bg-background"
                >
                  <SelectValue placeholder="Select smtpEncryption" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="ssl">SSL</SelectItem>
                  <SelectItem value="tls">TLS</SelectItem>
                  <SelectItem value="starttls">STARTTLS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2 w-full">
            <Label htmlFor="from-email">From Email Address</Label>
            <Input
              id="from-email"
              type="email"
              value={smtpFromEmail}
              onChange={(e) => setSmtpFromEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="from-name">From Name</Label>
            <Input
              id="from-name"
              type="text"
              value={smtpFromName}
              onChange={(e) => setSmtpFromName(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end py-4">
        <Button
          className="px-8 bg-[#5952FF] text-white"
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </CardFooter>
    </>
  );
}
