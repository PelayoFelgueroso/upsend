"use client";

import { PageHeader } from "@/dashboard/components/PageHeader";
import { QuickStart } from "@/dashboard/documentation/components/QuickStart";
import { Installation } from "@/dashboard/documentation/components/Installation";
import { APIAuthentication } from "@/dashboard/documentation/components/APIAuthentication";
import { APIExamples } from "@/dashboard/documentation/components/APIExamples";
import { ResponseCodes } from "@/dashboard/documentation/components/ResponseCodes";
import { TemplateVariables } from "@/dashboard/documentation/components/TemplateVariables";
import { ComingSoon } from "@/dashboard/documentation/components/CominSoon";
import { Support } from "@/dashboard/documentation/components/Support";
import { APIEndpointDoc } from "@/dashboard/documentation/components/APIEndpointDoc";

export default function DocumentationPage() {
  return (
    <div className="flex-1 space-y-8">
      <PageHeader
        title={"API Documentation"}
        subtitle={
          "Complete guide to integrate EasyMailJS into your JavaScript/TypeScript applications"
        }
      />

      <QuickStart />

      <Installation />

      <APIAuthentication />

      <APIExamples />

      <APIEndpointDoc />

      <ResponseCodes />

      <TemplateVariables />

      <ComingSoon />

      <Support />
    </div>
  );
}
