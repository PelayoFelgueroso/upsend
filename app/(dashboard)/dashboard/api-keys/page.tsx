"use client";

import { useState, Suspense } from "react";
import { ApiKeysSkeleton } from "@/dashboard/apiKeys/components/ApiKeysSkeleton";
import {
  useApiKeys,
  useRevokeApiKey,
} from "@/dashboard/apiKeys/hooks/useApiKeys";
import { toast } from "sonner";
import { PageHeader } from "@/dashboard/components/PageHeader";
import { CreateKeyDialog } from "@/dashboard/apiKeys/components/CreateKeyDialog";
import { SecurityKeyInfo } from "@/dashboard/apiKeys/components/SecurityKeyInfo";
import { ApiKeyTable } from "@/dashboard/apiKeys/components/ApiKeyTable/ApiKeyTable";
import { CreatedKeyDialog } from "@/dashboard/apiKeys/components/CreatedKeyDialog";
import { useI18n } from "@/i18n/hooks/usei18n";
import { PageError } from "@/dashboard/components/PageError";
import { DeleteDialog } from "@/dashboard/components/DeleteDialog";

function ApiKeysContent() {
  const { t } = useI18n("apiKeys");
  const { t: tCommon } = useI18n("common");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [showCreatedKey, setShowCreatedKey] = useState(false);
  const [revokeDialogOpen, setRevokeDialogOpen] = useState(false);
  const [keyToRevoke, setKeyToRevoke] = useState<string | null>(null);

  const { data: apiKeys, isLoading, error } = useApiKeys();
  const revokeApiKeyMutation = useRevokeApiKey();

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("API key copied to clipboard");
  };

  const handleRevoke = (keyId: string) => {
    setKeyToRevoke(keyId);
    setRevokeDialogOpen(true);
  };

  const confirmRevoke = () => {
    if (keyToRevoke) {
      revokeApiKeyMutation.mutate(keyToRevoke);
      setRevokeDialogOpen(false);
      setKeyToRevoke(null);
    }
  };

  if (isLoading) {
    return <ApiKeysSkeleton />;
  }

  if (error)
    return (
      <PageError>
        {" "}
        Failed to load API keys. Please try refreshing the page.
      </PageError>
    );

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <PageHeader title={t("title")} subtitle={t("subtitle")} />

        <CreateKeyDialog
          isOpen={isCreateDialogOpen}
          setIsOpen={setIsCreateDialogOpen}
          setCreatedKey={setCreatedKey}
          setShowCreatedKey={setShowCreatedKey}
        />
      </div>

      {/* Security Information */}
      <SecurityKeyInfo t={t} />

      {/* API Keys Table */}
      <ApiKeyTable
        apiKeys={apiKeys}
        setIsCreateDialogOpen={setIsCreateDialogOpen}
        handleCopyKey={handleCopyKey}
        handleRevoke={handleRevoke}
      />

      {/* Created Key Dialog */}
      <CreatedKeyDialog
        createdKey={createdKey}
        showCreatedKey={showCreatedKey}
        setCreatedKey={setCreatedKey}
        setShowCreatedKey={setShowCreatedKey}
        handleCopyKey={handleCopyKey}
      />

      {/* Revoke Confirmation Dialog */}
      <DeleteDialog
        title={"Revoke API Key"}
        description={
          "Are you sure you want to revoke this API key? This action cannot be undone and will immediately stop all requests using this key."
        }
        cancel={tCommon("actions.cancel")}
        action={"Revoke Key"}
        isOpen={revokeDialogOpen}
        setIsOpen={setRevokeDialogOpen}
        confirmDelete={confirmRevoke}
      />
    </div>
  );
}

export default function ApiKeysPage() {
  return (
    <Suspense fallback={<ApiKeysSkeleton />}>
      <ApiKeysContent />
    </Suspense>
  );
}
