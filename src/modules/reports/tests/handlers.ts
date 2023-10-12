/* eslint-disable @typescript-eslint/no-unused-vars */
import { rest } from "msw";
import { server } from "../../../api/testServer";
import { URLs } from "../../../api/endpoints";

const apiResponse = [
    {
        specification_id: 116,
        specification_name: "GS-Test12",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 128,
        specification_name: "xyz",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 114,
        specification_name: "GS-Test2",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 113,
        specification_name: "GS-TEST1",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 146,
        specification_name: "GS-ZASSPE",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 147,
        specification_name: "GS-ZASSPE",
        parent: 218,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 147,
        specification_name: "GS-ZASSPE",
        parent: 197,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 115,
        specification_name: "GS-TESTSPECIFICATION1",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 112,
        specification_name: "GS-SpecT",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 117,
        specification_name: "GS-Test2",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 135,
        specification_name: "spec009",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 118,
        specification_name: "GS-SpecificationTEST",
        parent: 159,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 120,
        specification_name: "parentspec",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 151,
        specification_name: "GS-PH1",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 121,
        specification_name: "testSpecP",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 152,
        specification_name: "GS-PH2",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 122,
        specification_name: "s",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 159,
        specification_name: "GS-PartPART",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 136,
        specification_name: "GS-FeatureTest",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 123,
        specification_name: "GS-TestSpecification",
        parent: 156,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 125,
        specification_name: "GS-ExemptionTest",
        parent: 154,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 148,
        specification_name: "GS-ZASSPE",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 166,
        specification_name: "GS-HC1",
        parent: 168,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 166,
        specification_name: "GS-HC1",
        parent: 169,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 137,
        specification_name: "GS-TESTSPT",
        parent: 168,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 171,
        specification_name: "GS-TTP2",
        parent: 172,
        validation_type: "Part Level",
    },
    {
        specification_id: 167,
        specification_name: "GS-HC2",
        parent: 169,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 138,
        specification_name: "GS-TESTSPECIFICATIONTESTTEST",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 154,
        specification_name: "GS-PH",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 139,
        specification_name: "testingcreatespec",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 140,
        specification_name: "GS-CHI1",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 153,
        specification_name: "GS-PH3",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 141,
        specification_name: "GS-CHI2",
        parent: 158,
        validation_type: "Part Level",
    },
    {
        specification_id: 156,
        specification_name: "GS-PARROHS",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 162,
        specification_name: "GS-TH",
        parent: 164,
        validation_type: "Part Level",
    },
    {
        specification_id: 158,
        specification_name: "GS-PPTEST",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 169,
        specification_name: "GS-HCP",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 164,
        specification_name: "GS-THP",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 126,
        specification_name: "GS-Specification",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 142,
        specification_name: "GS-CHI3",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 127,
        specification_name: "GS-Specification2",
        parent: 168,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 127,
        specification_name: "GS-Specification2",
        parent: 154,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 129,
        specification_name: "GS-TSpecification2",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 133,
        specification_name: "GS-SPECTESTTEST",
        parent: 168,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 134,
        specification_name: "GS-SPTEST",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 178,
        specification_name: "GS-STPP",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 175,
        specification_name: "GS-PRT",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 170,
        specification_name: "GS-TTP1",
        parent: 172,
        validation_type: "Part Level",
    },
    {
        specification_id: 177,
        specification_name: "Testnoor22",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 172,
        specification_name: "GS-TTS1",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 176,
        specification_name: "Test",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 168,
        specification_name: "GS-HCPARENT",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 179,
        specification_name: "GS-HOMOSPECCH1",
        parent: 181,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 180,
        specification_name: "GS-HOMOSPECCH2",
        parent: 181,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 182,
        specification_name: "GS-PSubP1",
        parent: 184,
        validation_type: "Part Level",
    },
    {
        specification_id: 183,
        specification_name: "GS-PSub2",
        parent: 184,
        validation_type: "Part Level",
    },
    {
        specification_id: 184,
        specification_name: "GS-PSub",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 163,
        specification_name: "GS-PARENTTH",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 187,
        specification_name: "GS-TP",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 255,
        specification_name: "GS-TESTSPECREG",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 216,
        specification_name: "gstest",
        parent: 262,
        validation_type: "Part Level",
    },
    {
        specification_id: 181,
        specification_name: "GS-ParenHOMO",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 200,
        specification_name: "gs-test",
        parent: 262,
        validation_type: "Part Level",
    },
    {
        specification_id: 217,
        specification_name: "GS_TTTS",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 243,
        specification_name: "GS-SpecificationTESTAGAIN",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 228,
        specification_name: "5196",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 143,
        specification_name: "GS-P1",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 144,
        specification_name: "GS-P2",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 145,
        specification_name: "GS-P3",
        parent: 262,
        validation_type: "Part Level",
    },
    {
        specification_id: 64,
        specification_name: "TestSpec1000",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 17,
        specification_name: "Germany Commodities Ordinance, BGBl. 5, 1998",
        parent: 159,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 31,
        specification_name: "PVC-Free",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 32,
        specification_name: "#W18 Section 2 Rev UD",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 33,
        specification_name: "W18 USA Rev UD",
        parent: 218,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 41,
        specification_name: "REACH Annex XIV (for RoHS Parts)",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 29,
        specification_name: "TSCA (US)",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 241,
        specification_name: "GS-TSP",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 245,
        specification_name: "GS-TESTAW",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 242,
        specification_name: "GS-SPTTEST",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 247,
        specification_name: "test",
        parent: 174,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 247,
        specification_name: "test",
        parent: 265,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 250,
        specification_name: "GS-PARENTSPECT",
        parent: 262,
        validation_type: "Part Level",
    },
    {
        specification_id: 250,
        specification_name: "GS-PARENTSPECT",
        parent: 255,
        validation_type: "Part Level",
    },
    {
        specification_id: 254,
        specification_name: "Spec-MH-0012",
        parent: 174,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 254,
        specification_name: "Spec-MH-0012",
        parent: 192,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 254,
        specification_name: "Spec-MH-0012",
        parent: 265,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 263,
        specification_name: "GS-PQER",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 264,
        specification_name: "GS-PTYI",
        parent: 262,
        validation_type: "Part Level",
    },
    {
        specification_id: 42,
        specification_name: "REACH Annex XVII (for RoHS Parts)",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 189,
        specification_name: "GS-HTP",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 192,
        specification_name: "asdf",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 246,
        specification_name: "dd sh test",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 236,
        specification_name: "check1",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 40,
        specification_name: "REACH Annex XIV",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 21,
        specification_name: "Japanese Law Preventing Environmental Pollution of Mercury",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 23,
        specification_name: "Norway Product Regulation No. 922 of 2004",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 24,
        specification_name: "REACH Annex XVII",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 262,
        specification_name: "GS-PRTREWR",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 25,
        specification_name: "Swiss Ordinance on Reduction of Risk from Chemical Products",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 26,
        specification_name: "The Montreal Protocol on Substances that Deplete Ozone Layer",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 27,
        specification_name: "Turkey Persistent Organic Pollutants Regulation 2018",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 30,
        specification_name: "Section 1 EPP restrictions",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 20,
        specification_name: "Japanese Law Article 13 Evaluation of Chemical Substances",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 205,
        specification_name: "GS-TESTT",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 206,
        specification_name: "GS-TESTSP",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 209,
        specification_name: "GS-SPTEST",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 55,
        specification_name: "Test Spec 001",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 57,
        specification_name: "Test Specification 890",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 28,
        specification_name: "California Proposition 65",
        parent: 177,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 28,
        specification_name: "California Proposition 65",
        parent: 176,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 28,
        specification_name: "California Proposition 65",
        parent: 159,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 12,
        specification_name: "China ROHS",
        parent: 164,
        validation_type: "Part Level",
    },
    {
        specification_id: 12,
        specification_name: "China ROHS",
        parent: 158,
        validation_type: "Part Level",
    },
    {
        specification_id: 9,
        specification_name: "California Perchlorate Contamination Prevention Act",
        parent: 159,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 10,
        specification_name: "Canadian Environmental Protection Act",
        parent: 177,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 10,
        specification_name: "Canadian Environmental Protection Act",
        parent: 176,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 10,
        specification_name: "Canadian Environmental Protection Act",
        parent: 153,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 15,
        specification_name: "EU Packaging Regulation 94 62 EC",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 11,
        specification_name: "Canadian Regulation SOR 2008-273",
        parent: 175,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 11,
        specification_name: "Canadian Regulation SOR 2008-273",
        parent: 153,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 14,
        specification_name: "EU Directive 2019 1021 EC",
        parent: 168,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 14,
        specification_name: "EU Directive 2019 1021 EC",
        parent: 153,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 16,
        specification_name: "EU ROHS 2",
        parent: 156,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 18,
        specification_name: "Human and Environmental Health Protection Act 2010",
        parent: 174,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 18,
        specification_name: "Human and Environmental Health Protection Act 2010",
        parent: 192,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 18,
        specification_name: "Human and Environmental Health Protection Act 2010",
        parent: 265,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 18,
        specification_name: "Human and Environmental Health Protection Act 2010",
        parent: 218,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 18,
        specification_name: "Human and Environmental Health Protection Act 2010",
        parent: 197,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 19,
        specification_name: "India ROHS",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 22,
        specification_name: "Japan ROHS",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 6,
        specification_name: "Conflict Mineral",
        parent: 175,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 6,
        specification_name: "Conflict Mineral",
        parent: 154,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 8,
        specification_name: "CA Prop 65",
        parent: 159,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 35,
        specification_name: "ROHS EFTA",
        parent: 34,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 36,
        specification_name: "Title 17 California Code of Regulations",
        parent: 34,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 38,
        specification_name: "Partial ROHS",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 39,
        specification_name: "REACH SVHC",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 7,
        specification_name: "Conflict Mineral List",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 34,
        specification_name: "W18 Section 1 Rev UD",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 13,
        specification_name: "EU Battery Directive 2006 66 EC",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 266,
        specification_name: "North Dakota",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 267,
        specification_name: "GS-TESTPARTIAL",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 174,
        specification_name: "GS-check",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 268,
        specification_name: "GS-SAQIBTEST",
        parent: null,
        validation_type: "Homogeneous Material Level",
    },
    {
        specification_id: 269,
        specification_name: "GS-ZASTESTPA",
        parent: null,
        validation_type: "Part Level",
    },
    {
        specification_id: 270,
        specification_name: "GS-PARTIALCHILD",
        parent: 269,
        validation_type: "Part Level",
    },
    {
        specification_id: 271,
        specification_name: "GS-LATESTPARTIAL",
        parent: null,
        validation_type: "Part Level",
    },
];
const expectedResult = [
    {
        value: "Part Level",
        label: "Part Level",
        children: [
            {
                label: "GS-Test12",
                value: {
                    value: 116,
                    label: "GS-Test12",
                },
                validationType: "Part Level",
            },
            {
                label: "xyz",
                value: {
                    value: 128,
                    label: "xyz",
                },
                validationType: "Part Level",
            },
            {
                label: "GS-Test2",
                value: {
                    value: 114,
                    label: "GS-Test2",
                },
                validationType: "Part Level",
            },
            {
                label: "GS-TEST1",
                value: {
                    value: 113,
                    label: "GS-TEST1",
                },
                validationType: "Part Level",
            },
            {
                label: "GS-TESTSPECIFICATION1",
                value: {
                    value: 115,
                    label: "GS-TESTSPECIFICATION1",
                },
                validationType: "Part Level",
            },
            {
                label: "GS-SpecT",
                value: {
                    value: 112,
                    label: "GS-SpecT",
                },
                validationType: "Part Level",
            },
            {
                label: "spec009",
                value: {
                    value: 135,
                    label: "spec009",
                },
                validationType: "Part Level",
            },
            {
                label: "GS-FeatureTest",
                value: {
                    value: 136,
                    label: "GS-FeatureTest",
                },
                validationType: "Part Level",
            },
            {
                label: "GS-CHI1",
                value: {
                    value: 140,
                    label: "GS-CHI1",
                },
                validationType: "Part Level",
            },
            {
                label: "GS-PPTEST",
                value: {
                    value: 158,
                    label: "GS-PPTEST",
                },
                validationType: "Part Level",
            },
            {
                label: "GS-THP",
                value: {
                    value: 164,
                    label: "GS-THP",
                },
                validationType: "Part Level",
            },
            {
                label: "GS-Specification",
                value: {
                    value: 126,
                    label: "GS-Specification",
                },
                validationType: "Part Level",
            },
            {
                label: "GS-CHI3",
                value: {
                    value: 142,
                    label: "GS-CHI3",
                },
                validationType: "Part Level",
            },
            {
                label: "GS-TSpecification2",
                value: {
                    value: 129,
                    label: "GS-TSpecification2",
                },
                validationType: "Part Level",
            },
            {
                label: "GS-SPTEST",
                value: {
                    value: 134,
                    label: "GS-SPTEST",
                },
                validationType: "Part Level",
            },
            {
                label: "GS-TTS1",
                value: {
                    value: 172,
                    label: "GS-TTS1",
                },
                validationType: "Part Level",
            },
            {
                label: "GS-PSub",
                value: {
                    value: 184,
                    label: "GS-PSub",
                },
                validationType: "Part Level",
            },
            {
                label: "GS-PARENTTH",
                value: {
                    value: 163,
                    label: "GS-PARENTTH",
                },
                validationType: "Part Level",
            },
            {
                label: "GS-TP",
                value: {
                    value: 187,
                    label: "GS-TP",
                },
                validationType: "Part Level",
            },
            {
                label: "GS-TESTSPECREG",
                value: {
                    value: 255,
                    label: "GS-TESTSPECREG",
                },
                validationType: "Part Level",
            },
            {
                label: "GS_TTTS",
                value: {
                    value: 217,
                    label: "GS_TTTS",
                },
                validationType: "Part Level",
            },
            {
                label: "GS-P1",
                value: {
                    value: 143,
                    label: "GS-P1",
                },
                validationType: "Part Level",
            },
            {
                label: "GS-P2",
                value: {
                    value: 144,
                    label: "GS-P2",
                },
                validationType: "Part Level",
            },
            {
                label: "GS-SPTTEST",
                value: {
                    value: 242,
                    label: "GS-SPTTEST",
                },
                validationType: "Part Level",
            },
            {
                label: "GS-PQER",
                value: {
                    value: 263,
                    label: "GS-PQER",
                },
                validationType: "Part Level",
            },
            {
                label: "GS-PRTREWR",
                value: {
                    value: 262,
                    label: "GS-PRTREWR",
                },
                validationType: "Part Level",
            },
            {
                label: "GS-TESTT",
                value: {
                    value: 205,
                    label: "GS-TESTT",
                },
                validationType: "Part Level",
            },
            {
                label: "GS-TESTSP",
                value: {
                    value: 206,
                    label: "GS-TESTSP",
                },
                validationType: "Part Level",
            },
            {
                label: "GS-SPTEST",
                value: {
                    value: 209,
                    label: "GS-SPTEST",
                },
                validationType: "Part Level",
            },
            {
                label: "EU Packaging Regulation 94 62 EC",
                value: {
                    value: 15,
                    label: "EU Packaging Regulation 94 62 EC",
                },
                validationType: "Part Level",
            },
            {
                label: "Conflict Mineral List",
                value: {
                    value: 7,
                    label: "Conflict Mineral List",
                },
                validationType: "Part Level",
            },
            {
                label: "EU Battery Directive 2006 66 EC",
                value: {
                    value: 13,
                    label: "EU Battery Directive 2006 66 EC",
                },
                validationType: "Part Level",
            },
            {
                label: "North Dakota",
                value: {
                    value: 266,
                    label: "North Dakota",
                },
                validationType: "Part Level",
            },
            {
                label: "GS-ZASTESTPA",
                value: {
                    value: 269,
                    label: "GS-ZASTESTPA",
                },
                validationType: "Part Level",
            },
            {
                label: "GS-LATESTPARTIAL",
                value: {
                    value: 271,
                    label: "GS-LATESTPARTIAL",
                },
                validationType: "Part Level",
            },
        ],
    },
    {
        value: "Homogeneous Material Level",
        label: "Homogeneous Material Level",
        children: [
            {
                label: "GS-ZASSPE",
                value: {
                    value: 146,
                    label: "GS-ZASSPE",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "GS-Test2",
                value: {
                    value: 117,
                    label: "GS-Test2",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "parentspec",
                value: {
                    value: 120,
                    label: "parentspec",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "GS-PH1",
                value: {
                    value: 151,
                    label: "GS-PH1",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "testSpecP",
                value: {
                    value: 121,
                    label: "testSpecP",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "GS-PH2",
                value: {
                    value: 152,
                    label: "GS-PH2",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "s",
                value: {
                    value: 122,
                    label: "s",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "GS-PartPART",
                value: {
                    value: 159,
                    label: "GS-PartPART",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "GS-ZASSPE",
                value: {
                    value: 148,
                    label: "GS-ZASSPE",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "GS-TESTSPECIFICATIONTESTTEST",
                value: {
                    value: 138,
                    label: "GS-TESTSPECIFICATIONTESTTEST",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "GS-PH",
                value: {
                    value: 154,
                    label: "GS-PH",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "testingcreatespec",
                value: {
                    value: 139,
                    label: "testingcreatespec",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "GS-PH3",
                value: {
                    value: 153,
                    label: "GS-PH3",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "GS-PARROHS",
                value: {
                    value: 156,
                    label: "GS-PARROHS",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "GS-HCP",
                value: {
                    value: 169,
                    label: "GS-HCP",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "GS-STPP",
                value: {
                    value: 178,
                    label: "GS-STPP",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "GS-PRT",
                value: {
                    value: 175,
                    label: "GS-PRT",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "Testnoor22",
                value: {
                    value: 177,
                    label: "Testnoor22",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "Test",
                value: {
                    value: 176,
                    label: "Test",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "GS-HCPARENT",
                value: {
                    value: 168,
                    label: "GS-HCPARENT",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "GS-ParenHOMO",
                value: {
                    value: 181,
                    label: "GS-ParenHOMO",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "GS-SpecificationTESTAGAIN",
                value: {
                    value: 243,
                    label: "GS-SpecificationTESTAGAIN",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "5196",
                value: {
                    value: 228,
                    label: "5196",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "TestSpec1000",
                value: {
                    value: 64,
                    label: "TestSpec1000",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "PVC-Free",
                value: {
                    value: 31,
                    label: "PVC-Free",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "#W18 Section 2 Rev UD",
                value: {
                    value: 32,
                    label: "#W18 Section 2 Rev UD",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "REACH Annex XIV (for RoHS Parts)",
                value: {
                    value: 41,
                    label: "REACH Annex XIV (for RoHS Parts)",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "TSCA (US)",
                value: {
                    value: 29,
                    label: "TSCA (US)",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "GS-TSP",
                value: {
                    value: 241,
                    label: "GS-TSP",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "GS-TESTAW",
                value: {
                    value: 245,
                    label: "GS-TESTAW",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "REACH Annex XVII (for RoHS Parts)",
                value: {
                    value: 42,
                    label: "REACH Annex XVII (for RoHS Parts)",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "GS-HTP",
                value: {
                    value: 189,
                    label: "GS-HTP",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "asdf",
                value: {
                    value: 192,
                    label: "asdf",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "dd sh test",
                value: {
                    value: 246,
                    label: "dd sh test",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "check1",
                value: {
                    value: 236,
                    label: "check1",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "REACH Annex XIV",
                value: {
                    value: 40,
                    label: "REACH Annex XIV",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "Japanese Law Preventing Environmental Pollution of Mercury",
                value: {
                    value: 21,
                    label: "Japanese Law Preventing Environmental Pollution of Mercury",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "Norway Product Regulation No. 922 of 2004",
                value: {
                    value: 23,
                    label: "Norway Product Regulation No. 922 of 2004",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "REACH Annex XVII",
                value: {
                    value: 24,
                    label: "REACH Annex XVII",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "Swiss Ordinance on Reduction of Risk from Chemical Products",
                value: {
                    value: 25,
                    label: "Swiss Ordinance on Reduction of Risk from Chemical Products",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "The Montreal Protocol on Substances that Deplete Ozone Layer",
                value: {
                    value: 26,
                    label: "The Montreal Protocol on Substances that Deplete Ozone Layer",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "Turkey Persistent Organic Pollutants Regulation 2018",
                value: {
                    value: 27,
                    label: "Turkey Persistent Organic Pollutants Regulation 2018",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "Section 1 EPP restrictions",
                value: {
                    value: 30,
                    label: "Section 1 EPP restrictions",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "Japanese Law Article 13 Evaluation of Chemical Substances",
                value: {
                    value: 20,
                    label: "Japanese Law Article 13 Evaluation of Chemical Substances",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "Test Spec 001",
                value: {
                    value: 55,
                    label: "Test Spec 001",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "Test Specification 890",
                value: {
                    value: 57,
                    label: "Test Specification 890",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "India ROHS",
                value: {
                    value: 19,
                    label: "India ROHS",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "Japan ROHS",
                value: {
                    value: 22,
                    label: "Japan ROHS",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "Partial ROHS",
                value: {
                    value: 38,
                    label: "Partial ROHS",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "REACH SVHC",
                value: {
                    value: 39,
                    label: "REACH SVHC",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "W18 Section 1 Rev UD",
                value: {
                    value: 34,
                    label: "W18 Section 1 Rev UD",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "GS-TESTPARTIAL",
                value: {
                    value: 267,
                    label: "GS-TESTPARTIAL",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "GS-check",
                value: {
                    value: 174,
                    label: "GS-check",
                },
                validationType: "Homogeneous Material Level",
            },
            {
                label: "GS-SAQIBTEST",
                value: {
                    value: 268,
                    label: "GS-SAQIBTEST",
                },
                validationType: "Homogeneous Material Level",
            },
        ],
    },
];

const specUrl = URLs.MAIN.SPECIFICATION;

const getEnabledOnlySpecifications = rest.post(`${specUrl}/`, async (req, res, ctx) => {
    return await res(ctx.status(200), ctx.json(apiResponse));
});

const reportHandlers = [getEnabledOnlySpecifications];

export const setupReportHandlers = () => {
    server.use(...reportHandlers);
};
