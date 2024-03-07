import { LibraryBackup, LocalStorageBackup, SettingBackup } from "./backup.js";
export declare const restoreLibrary: (library: LibraryBackup, silent?: boolean) => Promise<void>;
export declare const restoreLocalStorage: (vault: LocalStorageBackup, silent?: boolean) => void;
export declare const restoreSettings: (data: SettingBackup, silent?: boolean) => Promise<void>;
