"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { DeleteConfirmation } from "@/components/delete-confirmation";
import { LogoDialog } from "@/components/logo-dialog";
import { UserDialog } from "@/components/user-dialog";
import { BackupDialog } from "@/components/backup-dialog";
import { RoleDialog, RoleData } from "@/components/role-dialog";
import { PermissionsDialog } from "@/components/permissions-dialog";
import { useToast } from "@/components/ui/use-toast";

type DeleteConfirmationState = {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
};

type LogoDialogState = {
  isOpen: boolean;
  currentLogo?: string;
  onSave: (logoFile: File | null) => void;
};

type UserData = {
  id?: string;
  name: string;
  email: string;
  role: string;
  password?: string;
};

type UserDialogState = {
  isOpen: boolean;
  user?: UserData;
  title: string;
  onSave: (userData: UserData) => void;
};

type BackupItem = {
  id: string;
  name: string;
  date: string;
  size: string;
  type: string;
};

type BackupDialogState = {
  isOpen: boolean;
  backups?: BackupItem[];
  onRestore: (backupId: string) => void;
};

type RoleDialogState = {
  isOpen: boolean;
  role?: RoleData;
  title: string;
  onSave: (roleData: RoleData) => void;
};

type PermissionsDialogState = {
  isOpen: boolean;
  roleName: string;
  initialPermissions?: { [key: string]: boolean };
  onSave: (permissions: { [key: string]: boolean }) => void;
};

type UIProviderState = {
  showToast: ({
    title,
    description,
    variant,
  }: {
    title: string;
    description: string;
    variant?: "default" | "destructive" | "success";
  }) => void;
  showDeleteConfirmation: ({
    title,
    description,
    onConfirm,
  }: {
    title: string;
    description: string;
    onConfirm: () => void;
  }) => void;
  showLogoDialog: ({
    currentLogo,
    onSave,
  }: {
    currentLogo?: string;
    onSave: (logoFile: File | null) => void;
  }) => void;
  showUserDialog: ({
    user,
    title,
    onSave,
  }: {
    user?: UserData;
    title?: string;
    onSave: (userData: UserData) => void;
  }) => void;
  showBackupDialog: ({
    backups,
    onRestore,
  }: {
    backups?: BackupItem[];
    onRestore: (backupId: string) => void;
  }) => void;
  showRoleDialog: ({
    role,
    title,
    onSave,
  }: {
    role?: RoleData;
    title?: string;
    onSave: (roleData: RoleData) => void;
  }) => void;
  showPermissionsDialog: ({
    roleName,
    initialPermissions,
    onSave,
  }: {
    roleName: string;
    initialPermissions?: { [key: string]: boolean };
    onSave: (permissions: { [key: string]: boolean }) => void;
  }) => void;
};


const UIContext = createContext<UIProviderState | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [deleteConfirmation, setDeleteConfirmation] = useState<DeleteConfirmationState>({
    isOpen: false,
    title: "",
    description: "",
    onConfirm: () => {},
  });

  const [logoDialog, setLogoDialog] = useState<LogoDialogState>({
    isOpen: false,
    currentLogo: undefined,
    onSave: () => {},
  });

  const [userDialog, setUserDialog] = useState<UserDialogState>({
    isOpen: false,
    user: undefined,
    title: "إضافة مستخدم جديد",
    onSave: () => {},
  });

  const [backupDialog, setBackupDialog] = useState<BackupDialogState>({
    isOpen: false,
    backups: undefined,
    onRestore: () => {},
  });

  const [roleDialog, setRoleDialog] = useState<RoleDialogState>({
    isOpen: false,
    role: undefined,
    title: "إضافة دور جديد",
    onSave: () => {},
  });

  const [permissionsDialog, setPermissionsDialog] = useState<PermissionsDialogState>({
    isOpen: false,
    roleName: "",
    initialPermissions: undefined,
    onSave: () => {},
  });

  const showToast = ({
    title,
    description,
    variant = "default",
  }: {
    title: string;
    description: string;
    variant?: "default" | "destructive" | "success";
  }) => {
    toast({
      title,
      description,
      variant,
    });
  };

  const showDeleteConfirmation = ({
    title,
    description,
    onConfirm,
  }: {
    title: string;
    description: string;
    onConfirm: () => void;
  }) => {
    setDeleteConfirmation({
      isOpen: true,
      title,
      description,
      onConfirm: () => {
        onConfirm();
        setDeleteConfirmation((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation((prev) => ({ ...prev, isOpen: false }));
  };

  const showLogoDialog = ({
    currentLogo,
    onSave,
  }: {
    currentLogo?: string;
    onSave: (logoFile: File | null) => void;
  }) => {
    setLogoDialog({
      isOpen: true,
      currentLogo,
      onSave: (logoFile) => {
        onSave(logoFile);
        setLogoDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const closeLogoDialog = () => {
    setLogoDialog((prev) => ({ ...prev, isOpen: false }));
  };

  const showUserDialog = ({
    user,
    title = "إضافة مستخدم جديد",
    onSave,
  }: {
    user?: UserData;
    title?: string;
    onSave: (userData: UserData) => void;
  }) => {
    setUserDialog({
      isOpen: true,
      user,
      title,
      onSave: (userData) => {
        onSave(userData);
        setUserDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const closeUserDialog = () => {
    setUserDialog((prev) => ({ ...prev, isOpen: false }));
  };

  const showBackupDialog = ({
    backups,
    onRestore,
  }: {
    backups?: BackupItem[];
    onRestore: (backupId: string) => void;
  }) => {
    setBackupDialog({
      isOpen: true,
      backups,
      onRestore: (backupId) => {
        onRestore(backupId);
        setBackupDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const closeBackupDialog = () => {
    setBackupDialog((prev) => ({ ...prev, isOpen: false }));
  };

  const showRoleDialog = ({
    role,
    title = "إضافة دور جديد",
    onSave,
  }: {
    role?: RoleData;
    title?: string;
    onSave: (roleData: RoleData) => void;
  }) => {
    setRoleDialog({
      isOpen: true,
      role,
      title,
      onSave: (roleData) => {
        onSave(roleData);
        setRoleDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const closeRoleDialog = () => {
    setRoleDialog((prev) => ({ ...prev, isOpen: false }));
  };

  const showPermissionsDialog = ({
    roleName,
    initialPermissions,
    onSave,
  }: {
    roleName: string;
    initialPermissions?: { [key: string]: boolean };
    onSave: (permissions: { [key: string]: boolean }) => void;
  }) => {
    setPermissionsDialog({
      isOpen: true,
      roleName,
      initialPermissions,
      onSave: (permissions) => {
        onSave(permissions);
        setPermissionsDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const closePermissionsDialog = () => {
    setPermissionsDialog((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <UIContext.Provider
      value={{
        showToast,
        showDeleteConfirmation,
        showLogoDialog,
        showUserDialog,
        showBackupDialog,
        showRoleDialog,
        showPermissionsDialog,
      }}
    >
      {children}
      <DeleteConfirmation
        isOpen={deleteConfirmation.isOpen}
        onClose={closeDeleteConfirmation}
        onConfirm={deleteConfirmation.onConfirm}
        title={deleteConfirmation.title}
        description={deleteConfirmation.description}
      />
      <LogoDialog
        isOpen={logoDialog.isOpen}
        onClose={closeLogoDialog}
        onSave={logoDialog.onSave}
        currentLogo={logoDialog.currentLogo}
      />
      <UserDialog
        isOpen={userDialog.isOpen}
        onClose={closeUserDialog}
        onSave={userDialog.onSave}
        user={userDialog.user}
        title={userDialog.title}
      />
      <BackupDialog
        isOpen={backupDialog.isOpen}
        onClose={closeBackupDialog}
        onRestore={backupDialog.onRestore}
        backups={backupDialog.backups}
      />
      <RoleDialog
        isOpen={roleDialog.isOpen}
        onClose={closeRoleDialog}
        onSave={roleDialog.onSave}
        role={roleDialog.role}
        title={roleDialog.title}
      />
      <PermissionsDialog
        isOpen={permissionsDialog.isOpen}
        onClose={closePermissionsDialog}
        onSave={permissionsDialog.onSave}
        roleName={permissionsDialog.roleName}
        initialPermissions={permissionsDialog.initialPermissions}
      />
    </UIContext.Provider>
  );
}

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};