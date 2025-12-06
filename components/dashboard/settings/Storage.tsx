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

export default function Storage() {
  return (
    <>
      <CardHeader className="pt-5">
        <div>
          <CardTitle className="text-2xl font-bold mb-2">
            Storage Configuration
          </CardTitle>
          <CardDescription>Configure file storage location</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Storage Provider */}
        <div className="space-y-2">
          <Label htmlFor="storage-provider">Storage Provider</Label>
          <Select defaultValue="local">
            <SelectTrigger
              id="storage-provider"
              className="w-full bg-background"
            >
              <SelectValue placeholder="Select storage provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="local">Local Storage</SelectItem>
              <SelectItem value="s3">Amazon S3</SelectItem>
              <SelectItem value="gcs">Google Cloud Storage</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Current storage info / Stripe key */}
        <div className="space-y-2">
          <Label htmlFor="stripe-secret">Stripe Secret Key</Label>
          <div className="rounded-md border bg-muted px-4 py-3 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">
              Current storage: Local Storage
            </p>
            <p>Used: 2.4 GB / 10 GB (24%)…</p>
          </div>
        </div>

        {/* AWS S3 fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="s3-bucket">AWS S3 Bucket Name</Label>
            <Input id="s3-bucket" placeholder="my-bucket-name" type="text" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aws-access-key">AWS Access Key</Label>
            <Input id="aws-access-key" placeholder="AKIA..." type="text" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aws-secret-key">AWS Secret Key</Label>
            <Input
              id="aws-secret-key"
              placeholder="Enter secret key"
              type="password"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aws-region">Region</Label>
            <Input id="aws-region" placeholder="us-east-1" type="text" />
          </div>
          <CardFooter className="flex justify-end py-4">
            <Button className="px-8 bg-[#5952FF] text-white">Save</Button>
          </CardFooter>
        </div>
      </CardContent>
    </>
  );
}
