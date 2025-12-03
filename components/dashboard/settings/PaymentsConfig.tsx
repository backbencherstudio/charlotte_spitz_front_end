"use client";

import React, { useState } from "react";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Key } from "lucide-react";

export default function PaymentsConfig() {
  const [autoRenew, setAutoRenew] = useState(true);
  const [invoiceGeneration, setInvoiceGeneration] = useState(true);

  return (
    <>
      <CardHeader className="">
        <div>
          <CardTitle>Payment Gateway Configuration</CardTitle>
          <CardDescription>
            Configure your payment processors and settings
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="primary-gateway">Primary Payment Gateway</Label>
          <Input
            id="primary-gateway"
            placeholder="Enter primary payment gateway"
            type="text"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="stripe-publishable">Stripe Publishable Key</Label>
            <div className="relative">
              <Input
                id="stripe-publishable"
                placeholder="pk_live_..."
                type="text"
                defaultValue="pk_live_..."
                className="pl-10"
              />
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stripe-secret">Stripe Secret Key</Label>
            <div className="relative">
              <Input
                id="stripe-secret"
                placeholder="pk_live_..."
                type="password"
                defaultValue="pk_live_..."
                className="pl-10"
              />
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Input id="currency" placeholder="Enter currency" type="text" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="from-name">From Name</Label>
          <Input
            id="from-name"
            placeholder="Admin Panel"
            type="text"
            defaultValue="Admin Panel"
          />
        </div>

        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-renew" className="text-base font-medium">
                Auto-renew Subscriptions
              </Label>
              <p className="text-sm text-muted-foreground">
                Automatically renew subscriptions before expiry
              </p>
            </div>
            <Switch
              id="auto-renew"
              checked={autoRenew}
              onCheckedChange={setAutoRenew}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label
                htmlFor="invoice-generation"
                className="text-base font-medium"
              >
                Invoice Generation
              </Label>
              <p className="text-sm text-muted-foreground">
                Automatically generate invoices for payments
              </p>
            </div>
            <Switch
              id="invoice-generation"
              checked={invoiceGeneration}
              onCheckedChange={setInvoiceGeneration}
            />
          </div>
        </div>
      </CardContent>
      {/* <CardFooter className="flex justify-end border-t py-4">
        <Button className="px-8 bg-primary text-primary-foreground">
          Save
        </Button>
      </CardFooter> */}
    </>
  );
}
