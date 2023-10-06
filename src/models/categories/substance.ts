import { type Exemption } from "./exemption";

export interface Substance {
    substanceId: number;
    substanceName: string;
    substanceDes: string;
    casNumber: string;
    substanceType: "Material" | "Subpart" | "Substance" | "Substance Group";
    attribute1: string;
    attribute2: string;
    attribute3: string;
    attribute4: string;
    attribute5: string;
    ecNumber: string | null;
    threshold: number;
    exemptions: Exemption[];
    favourite: boolean;
}
