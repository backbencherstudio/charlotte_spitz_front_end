"use client";

import React from "react";
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

export default function EmailConfig() {
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
              <Select>
                <SelectTrigger
                  id="smtp-provider"
                  className="w-full bg-background"
                >
                  <SelectValue placeholder="Select Duration" />
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
                placeholder="Enter your price"
                type="text"
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
                defaultValue="smtp.example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="encryption">Encryption</Label>
              <Select>
                <SelectTrigger id="encryption" className="w-full bg-background">
                  <SelectValue placeholder="Enter your price" />
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
              defaultValue="noreply@example.com"
            />
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="from-name">From Name</Label>
            <Input id="from-name" type="text" defaultValue="Admin Panel" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end py-4">
        <Button className="px-8 bg-[#5952FF] text-white">Save</Button>
      </CardFooter>
    </>
  );
}
