import { useState } from ”react”;

// ============================================================
// DATA
// ============================================================
const DOGS_DATA = [
{ id: ”uri”,     callName: ”ウリ”,      pedigreeName: ”ADOLPH JP KALI”,                      jkc: ”HU-01349/23”,   chip: ””,              gender: ”メス”, birthdate: ”2023-05-20”, color: ”BLACK & WHITE”,  breed: ”シベリアンハスキー”,  fatherId: ”zeus”,   motherId: ”kaoru”,  note: ”” },
{ id: ”sae”,     callName: ”サエ”,      pedigreeName: ”ADOLPH JP MUT”,                       jkc: ”HU-00209/23”,   chip: ”392149002201909”, gender: ”メス”, birthdate: ”2022-11-17”, color: ”SILVER & WHITE”, breed: ”シベリアンハスキー”,  fatherId: ”ace”,    motherId: ”ran”,    note: ”” },
{ id: ”luna”,    callName: ”ルナ”,      pedigreeName: ”ADOLPH JP LUNA FROST”,                jkc: ”HU-00468/26”,   chip: ””,              gender: ”メス”, birthdate: ”2025-12-10”, color: ”BLACK & WHITE”,  breed: ”シベリアンハスキー”,  fatherId: ”waru”,   motherId: ”sae”,    note: ”” },
{ id: ”uran”,    callName: ”ウラン”,    pedigreeName: ”BIRDIE OF OSAKA SAEKI JP”,            jkc: ”HU-00298/23”,   chip: ””,              gender: ”メス”, birthdate: ”2022-11-24”, color: ”SILVER & WHITE”, breed: ”シベリアンハスキー”,  fatherId: ”ares”,   motherId: ”anna”,   note: ”” },
{ id: ”nacchan”, callName: ”なっちゃん”, pedigreeName: ”ADOLPH JP SEDONA”,                    jkc: ”HU-00579/25”,   chip: ””,              gender: ”メス”, birthdate: ”2025-01-01”, color: ”SILVER & WHITE”, breed: ”シベリアンハスキー”,  fatherId: ”runo”,   motherId: ”kaoru”,  note: ”初産” },
{ id: ”nontan”,  callName: ”ノンタン”,  pedigreeName: ”ADOLPH JP TATURA”,                    jkc: ”HU-00576/25”,   chip: ””,              gender: ”オス”, birthdate: ”2025-01-01”, color: ”BLACK & WHITE”,  breed: ”シベリアンハスキー”,  fatherId: ”runo”,   motherId: ”kaoru”,  note: ”なっちゃんの兄妹” },
{ id: ”yomogi”,  callName: ”よもぎ”,    pedigreeName: ”FANKY KANAOKA JP YOMOGI”,             jkc: ”WP-01988/20”,   chip: ”392144000405691”, gender: ”メス”, birthdate: ”2020-03-19”, color: ”RED & WHITE”,    breed: ”ウェルシュコーギー”, fatherId: ”barley”, motherId: ”sango”,  note: ”” },
{ id: ”chihiro”, callName: ”ちひろ”,    pedigreeName: ”FANKY KANAOKA JP NEVER ENDING STORY”, jkc: ”WP-02235/21”,   chip: ”392144000536142”, gender: ”メス”, birthdate: ”2021-05-06”, color: ”RED & WHITE”,    breed: ”ウェルシュコーギー”, fatherId: ”barley”, motherId: ”sakura”, note: ”” },
{ id: ”alexa”,   callName: ”アレクサ”,  pedigreeName: ”MEILLEUR AMI JP AMAZON”,              jkc: ”WP-00215/23”,   chip: ”392149002201911”, gender: ”メス”, birthdate: ”2022-10-18”, color: ”RED & WHITE”,    breed: ”ウェルシュコーギー”, fatherId: ”prince”, motherId: ”yomogi”, note: ”” },
{ id: ”prince”,  callName: ”プリンス”,  pedigreeName: ”BALLETCOR PRINCE CHARMING”,           jkc: ”WP-03885/19-I”, chip: ”977200009529573”, gender: ”オス”, birthdate: ”2018-11-23”, color: ”TRICOLOUR”,      breed: ”ウェルシュコーギー”, fatherId: null,     motherId: null,     note: ”外国産輸入” },
];
const EXTERNAL_DATA = [
{ id: ”zeus”,   callName: ”ゼウス”,   breed: ”シベリアンハスキー”,  gender: ”オス”, external: true },
{ id: ”kaoru”,  callName: ”カオル”,   breed: ”シベリアンハスキー”,  gender: ”メス”, external: true },
{ id: ”ace”,    callName: ”エース”,   breed: ”シベリアンハスキー”,  gender: ”オス”, external: true },
{ id: ”ran”,    callName: ”ラン”,     breed: ”シベリアンハスキー”,  gender: ”メス”, external: true },
{ id: ”waru”,   callName: ”ワル”,     breed: ”シベリアンハスキー”,  gender: ”オス”, external: true },
{ id: ”ares”,   callName: ”アレス”,   breed: ”シベリアンハスキー”,  gender: ”オス”, external: true },
{ id: ”anna”,   callName: ”アンナ”,   breed: ”シベリアンハスキー”,  gender: ”メス”, external: true },
{ id: ”runo”,   callName: ”ルノ”,     breed: ”シベリアンハスキー”,  gender: ”オス”, external: true },
{ id: ”barley”, callName: ”バーリー”, breed: ”ウェルシュコーギー”,  gender: ”オス”, external: true },
{ id: ”sango”,  callName: ”サンゴ”,   breed: ”ウェルシュコーギー”,  gender: ”メス”, external: true },
{ id: ”sakura”, callName: ”さくら”,   breed: ”ウェルシュコーギー”,  gender: ”メス”, external: true },
{ id: ”korleone”, callName: ”コルレオーネ”, breed: ”ウェルシュコーギー”, gender: ”オス”, external: true },
];

const HEAT_RECORDS_DATA = [
{ id: ”r_wu1”, dogId: ”uri”,     type: ”heat”,     date: ”2025-08-29”, note: ”” },
{ id: ”r_wu2”, dogId: ”uri”,     type: ”breeding”,  date: ”2025-09-05”, fatherName: ”ワル”,    fatherId: ”waru”,     method: ”人工交配”, status: ”不成立”, group: ”g_wu1”, note: ”” },
{ id: ”r_wu3”, dogId: ”uri”,     type: ”breeding”,  date: ”2025-09-07”, fatherName: ”ワル”,    fatherId: ”waru”,     method: ”自然交配”, status: ”不成立”, group: ”g_wu1”, note: ”” },
{ id: ”r_au1”, dogId: ”uri”,     type: ”breeding”,  date: ”2025-09-09”, fatherName: ”アク”,   fatherId: ”ace”,      method: ”自然交配”, status: ”出産済”, group: ”g_au1”, note: ”” },
{ id: ”r_au2”, dogId: ”uri”,     type: ”breeding”,  date: ”2025-09-11”, fatherName: ”アク”,   fatherId: ”ace”,      method: ”自然交配”, status: ”出産済”, group: ”g_au1”, note: ”” },
{ id: ”r_au3”, dogId: ”uri”,     type: ”breeding”,  date: ”2025-09-13”, fatherName: ”アク”,   fatherId: ”ace”,      method: ”自然交配”, status: ”出産済”, group: ”g_au1”, note: ”” },
{ id: ”r_au4”, dogId: ”uri”,     type: ”breeding”,  date: ”2025-09-15”, fatherName: ”アク”,   fatherId: ”ace”,      method: ”自然交配”, status: ”出産済”, group: ”g_au1”, note: ”” },
{ id: ”r_au_birth”, dogId: ”uri”, type: ”birth”,   date: ”2025-11-13”, fatherName: ”アク”,   fatherId: ”ace”,      group: ”g_au1”, birthMethod: ”自然分娩”, pregnancyDays: 63, totalPups: 4, malePups: 1, femalePups: 3, stillborn: 0, note: ”” },
{ id: ”r_wu4”, dogId: ”uri”,     type: ”heat”,     date: ”2026-04-27”, note: ”” },
{ id: ”r_wu5”, dogId: ”uri”,     type: ”breeding”,  date: ”2026-05-04”, fatherName: ”ワル”,    fatherId: ”waru”,     method: ”人工交配”, status: ”交配中”, group: ”g_wu2”, note: ”” },
{ id: ”r_wu6”, dogId: ”uri”,     type: ”breeding”,  date: ”2026-05-05”, fatherName: ”ワル”,    fatherId: ”waru”,     method: ”人工交配”, status: ”交配中”, group: ”g_wu2”, note: ”” },
{ id: ”r_wu7”, dogId: ”uri”,     type: ”breeding”,  date: ”2026-05-08”, fatherName: ”ワル”,    fatherId: ”waru”,     method: ”人工交配”, status: ”交配中”, group: ”g_wu2”, note: ”” },
{ id: ”r_eu1”, dogId: ”uran”,    type: ”heat”,     date: ”2025-08-31”, note: ”” },
{ id: ”r_eu2”, dogId: ”uran”,    type: ”breeding”,  date: ”2025-09-07”, fatherName: ”エース”,  fatherId: ”ace”,      method: ”自然交配”, status: ”不成立”, group: ”g_eu1”, note: ”” },
{ id: ”r_eu3”, dogId: ”uran”,    type: ”breeding”,  date: ”2025-09-09”, fatherName: ”エース”,  fatherId: ”ace”,      method: ”自然交配”, status: ”不成立”, group: ”g_eu1”, note: ”” },
{ id: ”r_eu4”, dogId: ”uran”,    type: ”breeding”,  date: ”2025-09-11”, fatherName: ”エース”,  fatherId: ”ace”,      method: ”自然交配”, status: ”不成立”, group: ”g_eu1”, note: ”” },
{ id: ”r_eu5”, dogId: ”uran”,    type: ”breeding”,  date: ”2025-09-13”, fatherName: ”エース”,  fatherId: ”ace”,      method: ”自然交配”, status: ”不成立”, group: ”g_eu1”, note: ”” },
{ id: ”r_eu6”, dogId: ”uran”,    type: ”breeding”,  date: ”2025-09-15”, fatherName: ”エース”,  fatherId: ”ace”,      method: ”自然交配”, status: ”不成立”, group: ”g_eu1”, note: ”” },
{ id: ”r_nu1”, dogId: ”uran”,    type: ”heat”,     date: ”2026-01-20”, note: ”” },
{ id: ”r_nu2”, dogId: ”uran”,    type: ”breeding”,  date: ”2026-01-27”, fatherName: ”ノンタン”, fatherId: ”nontan”,   method: ”自然交配”, status: ”出産済”, group: ”g_nu1”, note: ”” },
{ id: ”r_nu3”, dogId: ”uran”,    type: ”breeding”,  date: ”2026-01-29”, fatherName: ”ノンタン”, fatherId: ”nontan”,   method: ”自然交配”, status: ”出産済”, group: ”g_nu1”, note: ”” },
{ id: ”r_nu_birth”, dogId: ”uran”, type: ”birth”,  date: ”2026-03-31”, fatherName: ”ノンタン”, fatherId: ”nontan”,   group: ”g_nu1”, birthMethod: ”自然分娩”, pregnancyDays: 61, totalPups: 4, malePups: 1, femalePups: 3, stillborn: 0, note: ”” },
{ id: ”r_pc1”, dogId: ”chihiro”, type: ”heat”,     date: ”2025-10-07”, note: ”” },
{ id: ”r_pc2”, dogId: ”chihiro”, type: ”breeding”,  date: ”2025-10-14”, fatherName: ”プリンス”, fatherId: ”prince”,   method: ”人工交配”, status: ”出産済”, group: ”g_pc1”, note: ”” },
{ id: ”r_pc3”, dogId: ”chihiro”, type: ”breeding”,  date: ”2025-10-16”, fatherName: ”プリンス”, fatherId: ”prince”,   method: ”人工交配”, status: ”出産済”, group: ”g_pc1”, note: ”” },
{ id: ”r_pc4”, dogId: ”chihiro”, type: ”breeding”,  date: ”2025-10-18”, fatherName: ”プリンス”, fatherId: ”prince”,   method: ”人工交配”, status: ”出産済”, group: ”g_pc1”, note: ”” },
{ id: ”r_pc5”, dogId: ”chihiro”, type: ”breeding”,  date: ”2025-10-21”, fatherName: ”プリンス”, fatherId: ”prince”,   method: ”人工交配”, status: ”出産済”, group: ”g_pc1”, note: ”” },
{ id: ”r_pc_birth”, dogId: ”chihiro”, type: ”birth”, date: ”2025-12-16”, fatherName: ”プリンス”, fatherId: ”prince”, group: ”g_pc1”, birthMethod: ”自然分娩”, pregnancyDays: 62, totalPups: null, malePups: null, femalePups: null, stillborn: null, note: ”” },
{ id: ”r_pc6”, dogId: ”chihiro”, type: ”heat”,     date: ”2026-02-17”, note: ”” },
{ id: ”r_pc7”, dogId: ”chihiro”, type: ”breeding”,  date: ”2026-02-24”, fatherName: ”プリンス”, fatherId: ”prince”,   method: ”人工交配”, status: ”妊娠中”, group: ”g_pc2”, note: ”” },
{ id: ”r_pc8”, dogId: ”chihiro”, type: ”breeding”,  date: ”2026-02-26”, fatherName: ”プリンス”, fatherId: ”prince”,   method: ”人工交配”, status: ”妊娠中”, group: ”g_pc2”, note: ”” },
{ id: ”r_pc9”, dogId: ”chihiro”, type: ”breeding”,  date: ”2026-02-28”, fatherName: ”プリンス”, fatherId: ”prince”,   method: ”人工交配”, status: ”妊娠中”, group: ”g_pc2”, note: ”” },
{ id: ”r_pc10”, dogId: ”chihiro”, type: ”breeding”, date: ”2026-03-02”, fatherName: ”プリンス”, fatherId: ”prince”,   method: ”人工交配”, status: ”妊娠中”, group: ”g_pc2”, note: ”” },
{ id: ”r_pc11”, dogId: ”chihiro”, type: ”breeding”, date: ”2026-03-04”, fatherName: ”プリンス”, fatherId: ”prince”,   method: ”人工交配”, status: ”妊娠中”, group: ”g_pc2”, note: ”” },
{ id: ”r_as1”, dogId: ”sae”,     type: ”heat”,     date: ”2025-10-04”, note: ”” },
{ id: ”r_as2”, dogId: ”sae”,     type: ”breeding”,  date: ”2025-10-11”, fatherName: ”アク”,   fatherId: ”ace”,      method: ”自然交配”, status: ”出産済”, group: ”g_as1”, note: ”” },
{ id: ”r_as3”, dogId: ”sae”,     type: ”breeding”,  date: ”2025-10-16”, fatherName: ”エース”,  fatherId: ”ace”,      method: ”自然交配”, status: ”出産済”, group: ”g_as1”, note: ”” },
{ id: ”r_as4”, dogId: ”sae”,     type: ”breeding”,  date: ”2025-10-20”, fatherName: ”エース”,  fatherId: ”ace”,      method: ”自然交配”, status: ”出産済”, group: ”g_as1”, note: ”” },
{ id: ”r_as_birth”, dogId: ”sae”, type: ”birth”,   date: ”2025-12-21”, fatherName: ”エース”,  fatherId: ”ace”,      group: ”g_as1”, birthMethod: ”自然分娩”, pregnancyDays: 62, totalPups: 5, malePups: 1, femalePups: 4, stillborn: 1, note: ”” },
{ id: ”r_ns1”, dogId: ”sae”,     type: ”heat”,     date: ”2026-04-21”, note: ”” },
{ id: ”r_ns2”, dogId: ”sae”,     type: ”breeding”,  date: ”2026-04-28”, fatherName: ”ノンタン”, fatherId: ”nontan”,   method: ”自然交配”, status: ”交配中”, group: ”g_ns1”, note: ”” },
{ id: ”r_an1”, dogId: ”nacchan”, type: ”heat”,     date: ”2025-10-31”, note: ”初産” },
{ id: ”r_an2”, dogId: ”nacchan”, type: ”breeding”,  date: ”2025-11-07”, fatherName: ”アク”,   fatherId: ”ace”,      method: ”自然交配”, status: ”出産済”, group: ”g_an1”, note: ”” },
{ id: ”r_an3”, dogId: ”nacchan”, type: ”breeding”,  date: ”2025-11-10”, fatherName: ”アク”,   fatherId: ”ace”,      method: ”自然交配”, status: ”出産済”, group: ”g_an1”, note: ”” },
{ id: ”r_an4”, dogId: ”nacchan”, type: ”breeding”,  date: ”2025-11-13”, fatherName: ”アク”,   fatherId: ”ace”,      method: ”自然交配”, status: ”出産済”, group: ”g_an1”, note: ”” },
{ id: ”r_an_birth”, dogId: ”nacchan”, type: ”birth”, date: ”2026-01-11”, fatherName: ”アク”, fatherId: ”ace”,      group: ”g_an1”, birthMethod: ”自然分娩”, pregnancyDays: 62, totalPups: 7, malePups: 2, femalePups: 5, stillborn: 0, note: ”なっちゃんは初産” },
{ id: ”r_py1”, dogId: ”yomogi”,  type: ”heat”,     date: ”2026-02-12”, note: ”” },
{ id: ”r_py2”, dogId: ”yomogi”,  type: ”breeding”,  date: ”2026-02-15”, fatherName: ”プリンス”, fatherId: ”prince”,   method: ”人工交配”, status: ”出産済”, group: ”g_py1”, note: ”” },
{ id: ”r_py3”, dogId: ”yomogi”,  type: ”breeding”,  date: ”2026-02-17”, fatherName: ”プリンス”, fatherId: ”prince”,   method: ”人工交配”, status: ”出産済”, group: ”g_py1”, note: ”” },
{ id: ”r_py4”, dogId: ”yomogi”,  type: ”breeding”,  date: ”2026-02-19”, fatherName: ”プリンス”, fatherId: ”prince”,   method: ”人工交配”, status: ”出産済”, group: ”g_py1”, note: ”” },
{ id: ”r_py5”, dogId: ”yomogi”,  type: ”breeding”,  date: ”2026-02-21”, fatherName: ”プリンス”, fatherId: ”prince”,   method: ”人工交配”, status: ”出産済”, group: ”g_py1”, note: ”” },
{ id: ”r_py6”, dogId: ”yomogi”,  type: ”breeding”,  date: ”2026-02-23”, fatherName: ”プリンス”, fatherId: ”prince”,   method: ”人工交配”, status: ”出産済”, group: ”g_py1”, note: ”” },
{ id: ”r_py_birth”, dogId: ”yomogi”, type: ”birth”, date: ”2026-04-25”, fatherName: ”プリンス”, fatherId: ”prince”,  group: ”g_py1”, birthMethod: ”自然分娩”, pregnancyDays: 61, totalPups: 9, malePups: 1, femalePups: 1, stillborn: null, note: ”” },
{ id: ”r_ca1”, dogId: ”alexa”,   type: ”heat”,     date: ”2026-01-30”, note: ”” },
{ id: ”r_ca2”, dogId: ”alexa”,   type: ”breeding”,  date: ”2026-02-05”, fatherName: ”コルレオーネ”, fatherId: ”korleone”, method: ”人工交配”, status: ”出産済”, group: ”g_ca1”, note: ”” },
{ id: ”r_ca3”, dogId: ”alexa”,   type: ”breeding”,  date: ”2026-02-07”, fatherName: ”コルレオーネ”, fatherId: ”korleone”, method: ”人工交配”, status: ”出産済”, group: ”g_ca1”, note: ”” },
{ id: ”r_ca4”, dogId: ”alexa”,   type: ”breeding”,  date: ”2026-02-09”, fatherName: ”コルレオーネ”, fatherId: ”korleone”, method: ”人工交配”, status: ”出産済”, group: ”g_ca1”, note: ”” },
{ id: ”r_ca5”, dogId: ”alexa”,   type: ”breeding”,  date: ”2026-02-11”, fatherName: ”コルレオーネ”, fatherId: ”korleone”, method: ”人工交配”, status: ”出産済”, group: ”g_ca1”, note: ”” },
{ id: ”r_ca_birth”, dogId: ”alexa”, type: ”birth”, date: ”2026-04-09”, fatherName: ”コルレオーネ”, fatherId: ”korleone”, group: ”g_ca1”, birthMethod: ”帝王切開”, pregnancyDays: 63, totalPups: 9, malePups: 3, femalePups: 6, stillborn: 0, note: ”” },
];

const PUPPIES_DATA = [
{ id: ”p_au1”, birthId: ”r_au_birth”, no: 1, gender: ”オス”,  color: ”BLACK & WHITE”,  eyeColor: ””, identifier: ”赤リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_au2”, birthId: ”r_au_birth”, no: 2, gender: ”メス”,  color: ”BLACK & WHITE”,  eyeColor: ””, identifier: ”青リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_au3”, birthId: ”r_au_birth”, no: 3, gender: ”メス”,  color: ”SILVER & WHITE”, eyeColor: ””, identifier: ”黄リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_au4”, birthId: ”r_au_birth”, no: 4, gender: ”メス”,  color: ”SILVER & WHITE”, eyeColor: ””, identifier: ”緑リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_nu1”, birthId: ”r_nu_birth”, no: 1, gender: ”オス”,  color: ”BLACK & WHITE”,  eyeColor: ””, identifier: ”赤リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_nu2”, birthId: ”r_nu_birth”, no: 2, gender: ”メス”,  color: ”BLACK & WHITE”,  eyeColor: ””, identifier: ”青リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_nu3”, birthId: ”r_nu_birth”, no: 3, gender: ”メス”,  color: ”SILVER & WHITE”, eyeColor: ””, identifier: ”黄リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_nu4”, birthId: ”r_nu_birth”, no: 4, gender: ”メス”,  color: ”SILVER & WHITE”, eyeColor: ””, identifier: ”緑リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_as1”, birthId: ”r_as_birth”, no: 1, gender: ”オス”,  color: ”SILVER & WHITE”, eyeColor: ””, identifier: ”赤リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_as2”, birthId: ”r_as_birth”, no: 2, gender: ”メス”,  color: ”BLACK & WHITE”,  eyeColor: ””, identifier: ”青リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_as3”, birthId: ”r_as_birth”, no: 3, gender: ”メス”,  color: ”SILVER & WHITE”, eyeColor: ””, identifier: ”黄リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_as4”, birthId: ”r_as_birth”, no: 4, gender: ”メス”,  color: ”BLACK & WHITE”,  eyeColor: ””, identifier: ”緑リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_as5”, birthId: ”r_as_birth”, no: 5, gender: ”メス”,  color: ”SILVER & WHITE”, eyeColor: ””, identifier: ”白リボン”, birthWeight: ””, name: ””, chip: ””, note: ”死産” },
{ id: ”p_an1”, birthId: ”r_an_birth”, no: 1, gender: ”オス”,  color: ”BLACK & WHITE”,  eyeColor: ””, identifier: ”赤リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_an2”, birthId: ”r_an_birth”, no: 2, gender: ”オス”,  color: ”SILVER & WHITE”, eyeColor: ””, identifier: ”青リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_an3”, birthId: ”r_an_birth”, no: 3, gender: ”メス”,  color: ”BLACK & WHITE”,  eyeColor: ””, identifier: ”黄リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_an4”, birthId: ”r_an_birth”, no: 4, gender: ”メス”,  color: ”SILVER & WHITE”, eyeColor: ””, identifier: ”緑リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_an5”, birthId: ”r_an_birth”, no: 5, gender: ”メス”,  color: ”BLACK & WHITE”,  eyeColor: ””, identifier: ”白リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_an6”, birthId: ”r_an_birth”, no: 6, gender: ”メス”,  color: ”SILVER & WHITE”, eyeColor: ””, identifier: ”紫リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_an7”, birthId: ”r_an_birth”, no: 7, gender: ”メス”,  color: ”BLACK & WHITE”,  eyeColor: ””, identifier: ”橙リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_ca1”, birthId: ”r_ca_birth”, no: 1, gender: ”オス”,  color: ”RED & WHITE”,    eyeColor: ””, identifier: ”赤リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_ca2”, birthId: ”r_ca_birth”, no: 2, gender: ”オス”,  color: ”RED & WHITE”,    eyeColor: ””, identifier: ”青リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_ca3”, birthId: ”r_ca_birth”, no: 3, gender: ”オス”,  color: ”TRICOLOUR”,      eyeColor: ””, identifier: ”黄リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_ca4”, birthId: ”r_ca_birth”, no: 4, gender: ”メス”,  color: ”RED & WHITE”,    eyeColor: ””, identifier: ”緑リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_ca5”, birthId: ”r_ca_birth”, no: 5, gender: ”メス”,  color: ”RED & WHITE”,    eyeColor: ””, identifier: ”白リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_ca6”, birthId: ”r_ca_birth”, no: 6, gender: ”メス”,  color: ”TRICOLOUR”,      eyeColor: ””, identifier: ”紫リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_ca7”, birthId: ”r_ca_birth”, no: 7, gender: ”メス”,  color: ”RED & WHITE”,    eyeColor: ””, identifier: ”橙リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_ca8”, birthId: ”r_ca_birth”, no: 8, gender: ”メス”,  color: ”RED & WHITE”,    eyeColor: ””, identifier: ”桃リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_ca9”, birthId: ”r_ca_birth”, no: 9, gender: ”メス”,  color: ”TRICOLOUR”,      eyeColor: ””, identifier: ”黒リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_py1”, birthId: ”r_py_birth”, no: 1, gender: ”オス”,  color: ”RED & WHITE”,    eyeColor: ””, identifier: ”赤リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
{ id: ”p_py2”, birthId: ”r_py_birth”, no: 2, gender: ”メス”,  color: ”RED & WHITE”,    eyeColor: ””, identifier: ”青リボン”, birthWeight: ””, name: ””, chip: ””, note: ”” },
];

// ============================================================
// UTILS
// ============================================================
const todayStr = () => new Date().toISOString().slice(0, 10);
const formatDate = (d) => d ? d.replace(/-/g, ”/”) : ”－”;
const getAge = (b) => {
if (!b) return ””;
const diff = (new Date() - new Date(b)) / (1000 * 60 * 60 * 24 * 30.5);
if (diff < 12) return `${Math.floor(diff)}ヶ月`;
return `${Math.floor(diff / 12)}歳${Math.floor(diff % 12) > 0 ? Math.floor(diff % 12) + ”ヶ月” : ””}`;
};
const nextHeatEst = (d) => { if (!d) return null; const dt = new Date(d); dt.setDate(dt.getDate() + 180); return dt.toISOString().slice(0, 10); };
const daysDiff = (a, b = todayStr()) => !a ? null : Math.round((new Date(b) - new Date(a)) / 86400000);

const ALL_DOGS_MAP = […DOGS_DATA, …EXTERNAL_DATA];
const findDog = (id) => ALL_DOGS_MAP.find(d => d.id === id);

const STATUS_COLOR = {
”交配中”: { bg: ”rgba(91,143,201,0.15)”,  text: ”#5b8fc9”, border: ”rgba(91,143,201,0.4)” },
”妊娠中”: { bg: ”rgba(201,168,76,0.15)”,  text: ”#c9a84c”, border: ”rgba(201,168,76,0.4)” },
”出産済”: { bg: ”rgba(80,180,120,0.15)”,  text: ”#50b478”, border: ”rgba(80,180,120,0.4)” },
”不成立”: { bg: ”rgba(180,80,80,0.15)”,   text: ”#c96060”, border: ”rgba(180,80,80,0.4)” },
};

function groupHeatRecords(records) {
const result = []; const seen = new Set();
records.forEach(r => {
if (r.type !== ”breeding”) { result.push(r); return; }
if (!seen.has(r.group)) {
seen.add(r.group);
result.push({ …r, _groupRecs: records.filter(x => x.group === r.group && x.type === ”breeding”) });
}
});
return result.sort((a, b) => b.date.localeCompare(a.date));
}

// ============================================================
// STYLES
// ============================================================
const S = `
@import url(‘https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Mono:wght@400;500&display=swap’);
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
–bg:#0f0e0c;–surface:#1a1815;–surface2:#232018;–surface3:#2a2620;
–border:#2e2b24;–border2:#3d3930;
–gold:#c9a84c;–gold2:#e8c97a;–gold-dim:rgba(201,168,76,0.12);
–text:#f0ead8;–text2:#a09880;–text3:#6b6454;
–pink:#d4789e;–pink-dim:rgba(212,120,158,0.12);
–blue:#5b8fc9;–blue-dim:rgba(91,143,201,0.12);
–green:#50b478;–green-dim:rgba(80,180,120,0.12);
–corgi:#c97b3a;–corgi-dim:rgba(201,123,58,0.12);
–r:14px;–r-sm:8px;
}
body{font-family:‘Noto Sans JP’,sans-serif;background:var(–bg);color:var(–text);min-height:100vh}
.app{max-width:480px;margin:0 auto;min-height:100vh;display:flex;flex-direction:column}

/* HEADER */
.hdr{padding:14px 20px 12px;background:var(–surface);border-bottom:1px solid var(–border);position:sticky;top:0;z-index:100;display:flex;align-items:center;gap:10px}
.hdr-back{background:none;border:none;color:var(–text2);cursor:pointer;display:flex;align-items:center;padding:4px;border-radius:8px;flex-shrink:0}
.hdr-title{font-size:16px;font-weight:700;line-height:1.2}
.hdr-sub{font-size:10px;color:var(–text3);font-family:‘DM Mono’,monospace}

/* HOME */
.home-hero{padding:28px 20px 20px;background:linear-gradient(160deg,var(–surface2),var(–surface));border-bottom:1px solid var(–border)}
.home-eyebrow{font-size:10px;font-weight:700;letter-spacing:0.15em;color:var(–gold);text-transform:uppercase;margin-bottom:6px}
.home-title{font-family:‘Playfair Display’,serif;font-size:26px;line-height:1.25}
.home-title em{font-style:italic;color:var(–gold2)}
.home-date{font-size:11px;color:var(–text3);font-family:‘DM Mono’,monospace;margin-top:8px}
.home-cards{padding:16px 20px;display:flex;flex-direction:column;gap:12px;padding-bottom:40px}
.home-card{background:var(–surface);border:1px solid var(–border);border-radius:var(–r);padding:18px 20px;cursor:pointer;display:flex;align-items:center;gap:16px;transition:border-color 0.15s,transform 0.1s}
.home-card:active{transform:scale(0.98)}
.home-card.dog{border-left:4px solid var(–blue)}
.home-card.chicken{border-left:4px solid var(–green)}
.home-card-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0}
.home-card-icon.dog{background:var(–blue-dim)}
.home-card-icon.chicken{background:var(–green-dim)}
.home-card-info{flex:1}
.home-card-name{font-size:17px;font-weight:700}
.home-card-desc{font-size:12px;color:var(–text3);margin-top:3px}

/* DOG MENU */
.menu-list{padding:16px 20px;display:flex;flex-direction:column;gap:10px;padding-bottom:40px}
.menu-item{background:var(–surface);border:1px solid var(–border);border-radius:var(–r);padding:16px 18px;cursor:pointer;display:flex;align-items:center;gap:14px;transition:border-color 0.15s,transform 0.1s}
.menu-item:active{transform:scale(0.99)}
.menu-item-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
.menu-item-name{font-size:15px;font-weight:700}
.menu-item-desc{font-size:11px;color:var(–text3);margin-top:2px}

/* DOG LIST */
.breed-tabs{display:flex;gap:8px;padding:12px 20px;border-bottom:1px solid var(–border);overflow-x:auto;scrollbar-width:none}
.breed-tabs::-webkit-scrollbar{display:none}
.breed-tab{padding:7px 14px;border-radius:20px;border:1px solid var(–border2);background:none;font-family:‘Noto Sans JP’,sans-serif;font-size:12px;font-weight:700;cursor:pointer;color:var(–text3);white-space:nowrap;transition:all 0.15s}
.breed-tab.husky.on{background:var(–blue-dim);border-color:var(–blue);color:var(–blue)}
.breed-tab.corgi.on{background:var(–corgi-dim);border-color:var(–corgi);color:var(–corgi)}
.breed-tab.all.on{background:var(–gold-dim);border-color:var(–gold);color:var(–gold)}
.search-wrap{padding:10px 20px 0}
.search-input{width:100%;background:var(–surface);border:1px solid var(–border2);border-radius:10px;padding:9px 13px;font-size:13px;font-family:‘Noto Sans JP’,sans-serif;color:var(–text);outline:none}
.search-input:focus{border-color:var(–gold)}
.search-input::placeholder{color:var(–text3)}
.dog-list{padding:12px 20px;display:flex;flex-direction:column;gap:9px;padding-bottom:100px}
.dog-card{background:var(–surface);border:1px solid var(–border);border-radius:var(–r);padding:13px 15px;cursor:pointer;display:flex;align-items:center;gap:12px;transition:border-color 0.15s,transform 0.1s}
.dog-card:active{transform:scale(0.99)}
.dog-card.husky{border-left:3px solid var(–blue)}
.dog-card.corgi{border-left:3px solid var(–corgi)}
.dog-av{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
.dog-av.husky{background:var(–blue-dim)}
.dog-av.corgi{background:var(–corgi-dim)}
.dog-info{flex:1;min-width:0}
.dog-callname{font-size:15px;font-weight:700}
.dog-ped{font-size:10px;color:var(–text3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-family:‘DM Mono’,monospace;margin-top:1px}
.dog-badges{display:flex;gap:5px;margin-top:5px;flex-wrap:wrap}
.badge{font-size:10px;padding:2px 7px;border-radius:20px;font-weight:600}
.badge.female{background:rgba(212,120,158,0.2);color:var(–pink)}
.badge.male{background:var(–blue-dim);color:var(–blue)}
.badge.age{background:var(–surface2);color:var(–text2)}
.badge.color{background:var(–surface2);color:var(–text3);font-size:9px}

/* DOG DETAIL */
.detail-hero{padding:18px 20px;background:var(–surface);border-bottom:1px solid var(–border)}
.detail-name{font-size:26px;font-weight:900}
.detail-ped{font-size:10px;color:var(–text3);font-family:‘DM Mono’,monospace;margin-top:3px}
.detail-badges{display:flex;gap:6px;margin-top:10px;flex-wrap:wrap}
.info-card{background:var(–surface);border:1px solid var(–border);border-radius:var(–r);margin:12px 20px 0;padding:14px 16px}
.info-card-title{font-size:10px;font-weight:700;letter-spacing:0.1em;color:var(–gold);text-transform:uppercase;margin-bottom:11px}
.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:11px}
.info-item label{font-size:10px;color:var(–text3);display:block;margin-bottom:2px}
.info-item span{font-size:13px;font-weight:500}
.info-item.full{grid-column:1/-1}

/* LINK BUTTONS - 紐付けナビ */
.link-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
.link-btn{padding:7px 12px;border-radius:var(–r-sm);border:1px solid var(–border2);background:var(–surface2);font-family:‘Noto Sans JP’,sans-serif;font-size:12px;font-weight:700;cursor:pointer;color:var(–text2);transition:all 0.15s;display:flex;align-items:center;gap:5px}
.link-btn:active{border-color:var(–gold);color:var(–gold)}
.link-btn.pink{border-color:rgba(212,120,158,0.4);color:var(–pink);background:var(–pink-dim)}
.link-btn.blue{border-color:rgba(91,143,201,0.4);color:var(–blue);background:var(–blue-dim)}

/* FAMILY TREE */
.tree-card{background:var(–surface);border:1px solid var(–border);border-radius:var(–r);margin:12px 20px 0;padding:14px 16px}
.tree-title{font-size:10px;font-weight:700;letter-spacing:0.1em;color:var(–gold);text-transform:uppercase;margin-bottom:14px}
.tree-wrap{overflow-x:auto;padding-bottom:4px}
.tree-box{background:var(–surface2);border:1px solid var(–border2);border-radius:8px;padding:7px 10px;min-width:84px;cursor:pointer;transition:border-color 0.15s}
.tree-box:active{border-color:var(–gold)}
.tree-box.mine{border-color:var(–gold);background:var(–gold-dim)}
.tree-box.ext{border-style:dashed;opacity:0.7}
.tree-box .t-name{font-size:12px;font-weight:700}
.tree-box .t-role{font-size:9px;color:var(–text3);margin-top:1px}
.tree-box.m .t-name{color:var(–blue)}
.tree-box.f .t-name{color:var(–pink)}
.tree-box.mine .t-name{color:var(–gold2)}
.child-row{display:flex;align-items:center;gap:10px;background:var(–surface2);border-radius:var(–r-sm);padding:9px 12px;cursor:pointer;border:1px solid var(–border);transition:border-color 0.15s;margin-bottom:7px}
.child-row:active{border-color:var(–gold)}

/* HEAT / TIMELINE */
.dog-selector{display:flex;gap:8px;padding:10px 20px;overflow-x:auto;scrollbar-width:none;border-bottom:1px solid var(–border)}
.dog-selector::-webkit-scrollbar{display:none}
.dog-chip{padding:7px 13px;border-radius:20px;border:1px solid var(–border2);background:none;font-family:‘Noto Sans JP’,sans-serif;font-size:12px;font-weight:700;cursor:pointer;color:var(–text3);white-space:nowrap;transition:all 0.15s;flex-shrink:0}
.dog-chip.husky.on{background:var(–blue-dim);border-color:var(–blue);color:var(–blue)}
.dog-chip.corgi.on{background:var(–corgi-dim);border-color:var(–corgi);color:var(–corgi)}
.dog-hdr{padding:12px 20px;background:var(–surface);border-bottom:1px solid var(–border)}
.dog-hdr-name{font-size:19px;font-weight:900}
.dog-hdr-stats{display:flex;gap:18px;margin-top:9px}
.dhs-num{font-size:17px;font-weight:900;font-family:‘DM Mono’,monospace}
.dhs-lbl{font-size:10px;color:var(–text3);margin-top:1px}
.next-heat{margin:11px 20px 0;background:var(–pink-dim);border:1px solid rgba(212,120,158,0.25);border-radius:var(–r);padding:11px 15px;display:flex;align-items:center;justify-content:space-between}
.nh-label{font-size:11px;color:var(–pink);font-weight:700;margin-bottom:2px}
.nh-date{font-size:14px;font-weight:700;font-family:‘DM Mono’,monospace}
.timeline{padding:13px 20px;padding-bottom:110px}
.tl-year{font-size:11px;font-weight:700;color:var(–text3);letter-spacing:0.08em;margin:13px 0 8px}
.tl-item{display:flex;gap:10px;margin-bottom:2px}
.tl-line{display:flex;flex-direction:column;align-items:center;flex-shrink:0;width:28px}
.tl-dot{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;border:2px solid}
.tl-dot.heat{background:var(–pink-dim);border-color:rgba(212,120,158,0.4)}
.tl-dot.breeding{background:var(–gold-dim);border-color:rgba(201,168,76,0.4)}
.tl-dot.birth{background:var(–green-dim);border-color:rgba(80,180,120,0.4)}
.tl-vline{width:2px;background:var(–border);flex:1;min-height:10px;margin-top:3px}
.tl-content{flex:1;padding-bottom:11px}
.tl-card{background:var(–surface);border:1px solid var(–border);border-radius:var(–r-sm);padding:9px 12px}
.tl-card.heat-card{border-left:3px solid var(–pink)}
.tl-card.breeding-card{border-left:3px solid var(–gold)}
.tl-card.birth-card{border-left:3px solid var(–green)}
.tl-date{font-size:10px;font-family:‘DM Mono’,monospace;color:var(–text3);margin-bottom:2px}
.tl-type{font-size:13px;font-weight:700}
.tl-detail{font-size:11px;color:var(–text2);margin-top:2px}
.tl-note{font-size:10px;color:var(–text3);margin-top:3px;font-style:italic}
.status-badge{display:inline-flex;padding:2px 7px;border-radius:20px;font-size:10px;font-weight:700;border:1px solid;margin-top:4px}
.birth-summary{margin-top:6px;padding:7px 10px;background:var(–green-dim);border-radius:6px;border:1px solid rgba(80,180,120,0.2);cursor:pointer}
.birth-num{font-size:20px;font-weight:900;font-family:‘DM Mono’,monospace;color:var(–green)}
.birth-detail{font-size:11px;color:var(–text2);margin-top:2px}
.pup-grid{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:9px}
.pup-chip{background:var(–surface2);border:1px solid var(–border2);border-radius:var(–r-sm);padding:8px 10px;cursor:pointer;transition:border-color 0.15s;text-align:center}
.pup-chip:active{border-color:var(–gold)}
.pup-chip.pm{border-left:3px solid var(–blue)}
.pup-chip.pf{border-left:3px solid var(–pink)}
.pup-chip-no{font-size:9px;color:var(–text3);margin-bottom:2px}
.pup-chip-gender{font-size:11px;font-weight:700}
.pup-chip-color{font-size:9px;color:var(–text3);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pup-chip-id{font-size:9px;color:var(–gold);margin-top:2px}
.add-pup-btn{width:100%;padding:9px;border-radius:var(–r-sm);border:1px dashed var(–border2);background:none;font-family:‘Noto Sans JP’,sans-serif;font-size:12px;color:var(–text3);cursor:pointer;margin-top:7px;transition:all 0.15s}
.add-pup-btn:active{border-color:var(–gold);color:var(–gold)}

/* FAB */
.fab-wrap{position:fixed;bottom:26px;right:22px;display:flex;flex-direction:column;gap:9px;align-items:flex-end;z-index:150}
.fab{width:54px;height:54px;border-radius:15px;background:var(–gold);color:var(–bg);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(201,168,76,0.35);font-size:22px;transition:transform 0.1s}
.fab:active{transform:scale(0.92)}
.fab-sub{padding:9px 15px;border-radius:11px;border:none;font-family:‘Noto Sans JP’,sans-serif;font-size:12px;font-weight:700;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,0.3);white-space:nowrap}
.fab-sub.heat{background:var(–pink);color:white}
.fab-sub.breeding{background:var(–gold);color:var(–bg)}

/* MODAL */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,0.75);z-index:200;display:flex;align-items:flex-end}
.modal{background:var(–surface);border-radius:20px 20px 0 0;border-top:1px solid var(–border2);padding:18px 20px 40px;width:100%;max-height:88vh;overflow-y:auto}
.modal-title{font-size:15px;font-weight:700;margin-bottom:14px;color:var(–gold2)}
.field{margin-bottom:13px}
.field label{font-size:11px;font-weight:700;color:var(–text3);display:block;margin-bottom:4px}
.field input,.field select,.field textarea{width:100%;border:1px solid var(–border2);border-radius:8px;padding:9px 11px;font-size:13px;font-family:‘Noto Sans JP’,sans-serif;background:var(–surface2);color:var(–text);outline:none;transition:border-color 0.15s}
.field input:focus,.field select:focus,.field textarea:focus{border-color:var(–gold)}
.field select option{background:var(–surface2)}
.field textarea{resize:vertical;min-height:56px}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.btn-save{width:100%;padding:12px;border-radius:10px;border:none;background:var(–gold);color:var(–bg);font-family:‘Noto Sans JP’,sans-serif;font-size:14px;font-weight:700;cursor:pointer;margin-top:5px}
.btn-save.pink{background:var(–pink);color:white}
.btn-cancel{width:100%;padding:10px;border-radius:10px;border:1px solid var(–border2);background:none;font-family:‘Noto Sans JP’,sans-serif;font-size:13px;cursor:pointer;margin-top:7px;color:var(–text3)}
.empty{text-align:center;color:var(–text3);font-size:13px;padding:40px 0}

/* CHICKEN */
.flock-card{background:var(–surface);border:1px solid var(–border);border-radius:var(–r);padding:13px 15px;cursor:pointer;border-left:3px solid var(–green);margin-bottom:9px;transition:transform 0.1s}
.flock-card:active{transform:scale(0.99)}
.flock-name{font-size:15px;font-weight:700}
.flock-meta{font-size:11px;color:var(–text3);margin-top:2px}
.flock-count{font-size:26px;font-weight:900;font-family:‘DM Mono’,monospace;color:var(–green)}
.egg-row{display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid var(–border);font-size:12px}
.egg-row:last-child{border-bottom:none}
.egg-count{font-family:‘DM Mono’,monospace;font-weight:700}
.sale-amt{font-family:‘DM Mono’,monospace;font-weight:700;color:var(–green)}
`;

// ============================================================
// SHARED COMPONENTS
// ============================================================
function Hdr({ title, sub, onBack }) {
return (
<div className=”hdr”>
{onBack && <button className=”hdr-back” onClick={onBack}><svg width=”19” height=”19” viewBox=”0 0 24 24” fill=”none” stroke=”currentColor” strokeWidth=”2.5” strokeLinecap=”round” strokeLinejoin=”round”><polyline points=”15 18 9 12 15 6”/></svg></button>}
<div><div className=”hdr-title”>{title}</div>{sub && <div className=”hdr-sub”>{sub}</div>}</div>
</div>
);
}
function Modal({ title, onClose, children }) {
return (
<div className=”overlay” onClick={e => e.target.className === ”overlay” && onClose()}>
<div className=”modal”>
<div className=”modal-title”>{title}</div>
{children}
<button className=”btn-cancel” onClick={onClose}>キャンセル</button>
</div>
</div>
);
}

// ============================================================
// FAMILY TREE
// ============================================================
function FamilyTree({ dog, onSelect }) {
const fa = findDog(dog.fatherId), mo = findDog(dog.motherId);
const ff = fa ? findDog(fa.fatherId) : null, fm = fa ? findDog(fa.motherId) : null;
const mf = mo ? findDog(mo.fatherId) : null, mm = mo ? findDog(mo.motherId) : null;
const Box = ({ d, role }) => {
if (!d) return <div className=”tree-box ext”><div className=”t-name” style={{color:”var(–text3)”}}>不明</div><div className=”t-role”>{role}</div></div>;
const mine = !d.external;
return <div className={`tree-box ${mine?”mine”:”ext”} ${d.gender===”オス”?”m”:”f”}`} onClick={() => mine && onSelect(d)}>
<div className=”t-name”>{d.callName}</div><div className=”t-role”>{role}{d.external?” (外)”:””}</div>
</div>;
};
const line = <div style={{width:20,height:1,background:”var(–border2)”}}/>;
const vblock = (top, bot) => <div style={{display:”flex”,flexDirection:”column”,gap:8}}><Box d={top} role={top===ff?”父方祖父”:top===fm?”父方祖母”:top===mf?”母方祖父”:”母方祖母”}/><Box d={bot} role={bot===ff?”父方祖父”:bot===fm?”父方祖母”:bot===mf?”母方祖父”:”母方祖母”}/></div>;
return (
<div className=”tree-wrap”>
<div style={{display:”flex”,alignItems:”center”,gap:0,minWidth:”max-content”}}>
<div style={{display:”flex”,flexDirection:”column”,gap:32}}>
{vblock(ff,fm)}
{vblock(mf,mm)}
</div>
<div style={{display:”flex”,flexDirection:”column”,gap:32,width:20}}>
<div style={{display:”flex”,alignItems:”center”,height:66}}>{line}</div>
<div style={{display:”flex”,alignItems:”center”,height:66}}>{line}</div>
</div>
<div style={{display:”flex”,flexDirection:”column”,gap:32}}>
<Box d={fa} role=”父”/><Box d={mo} role=”母”/>
</div>
{line}
<div className=”tree-box mine” style={{borderWidth:2,minWidth:90}}>
<div className=”t-name” style={{fontSize:13}}>{dog.callName}</div>
<div className=”t-role”>本犬</div>
</div>
</div>
</div>
);
}

// ============================================================
// DOG DETAIL
// ============================================================
function DogDetail({ dog, dogs, heatRecords, onBack, onSelectDog, onGoHeat }) {
const allDogs = […dogs, …EXTERNAL_DATA];
const children = allDogs.filter(d => d.fatherId === dog.id || d.motherId === dog.id);
const isHusky = dog.breed?.includes(”ハスキー”);
const emoji = isHusky ? ”🐺” : ”🐕”;
const breedClass = isHusky ? ”husky” : ”corgi”;

// この犬のヒート・交配記録があるか
const hasHeatRecord = heatRecords.some(r => r.dogId === dog.id);

return (
<div style={{flex:1,paddingBottom:80}}>
<div className=”detail-hero”>
<div style={{fontSize:32,marginBottom:6}}>{emoji}</div>
<div className=”detail-name”>{dog.callName}</div>
<div className=”detail-ped”>{dog.pedigreeName}</div>
<div className=”detail-badges”>
<span className={`badge ${dog.gender===”メス”?”female”:”male”}`}>{dog.gender}</span>
<span className=”badge age” style={{background:isHusky?”var(–blue-dim)”:”var(–corgi-dim)”,color:isHusky?”var(–blue)”:”var(–corgi)”}}>{dog.breed}</span>
{dog.birthdate && <span className=”badge age”>{getAge(dog.birthdate)}</span>}
</div>
{/* 紐付けボタン */}
{dog.gender === ”メス” && (
<div className=”link-row”>
<button className=”link-btn pink” onClick={() => onGoHeat(dog)}>🌸 ヒート・交配記録を見る</button>
</div>
)}
</div>

```
  <div className=”info-card”>
    <div className=”info-card-title”>基本情報</div>
    <div className=”info-grid”>
      <div className=”info-item”><label>生年月日</label><span>{formatDate(dog.birthdate)}</span></div>
      <div className=”info-item”><label>毛色</label><span style={{fontSize:11}}>{dog.color}</span></div>
      <div className=”info-item full”><label>JKC登録番号</label><span style={{fontFamily:”DM Mono,monospace”,fontSize:12}}>{dog.jkc||”－”}</span></div>
      <div className=”info-item full”><label>マイクロチップ</label><span style={{fontFamily:”DM Mono,monospace”,fontSize:11}}>{dog.chip||”－”}</span></div>
      {dog.note && <div className=”info-item full”><label>備考</label><span>{dog.note}</span></div>}
    </div>
  </div>

  <div className=”tree-card”>
    <div className=”tree-title”>家系図（3世代）</div>
    <FamilyTree dog={dog} onSelect={onSelectDog} />
    <div style={{fontSize:9,color:”var(--text3)”,marginTop:8}}>金枠=自犬舎 · 点線=外部 · タップで詳細へ</div>
  </div>

  {children.length > 0 && (
    <div className=”info-card” style={{marginBottom:0}}>
      <div className=”info-card-title”>子犬 ({children.length}頭)</div>
      {children.filter(c => !c.external).map(c => (
        <div key={c.id} className=”child-row” onClick={() => onSelectDog(c)}>
          <span style={{fontSize:16}}>{c.breed?.includes(”ハスキー”)?”🐺”:”🐕”}</span>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,fontSize:14}}>{c.callName}</div>
            <div style={{fontSize:11,color:”var(--text3)”}}>{c.breed} · {formatDate(c.birthdate)}</div>
          </div>
          <span className={`badge ${c.gender===”メス”?”female”:”male”}`}>{c.gender}</span>
        </div>
      ))}
    </div>
  )}
</div>
```

);
}

// ============================================================
// DOG LIST SCREEN
// ============================================================
function DogListScreen({ dogs, heatRecords, onBack, onSelectDog, onGoHeat }) {
const [filter, setFilter] = useState(”all”);
const [search, setSearch] = useState(””);
const [detail, setDetail] = useState(null);

const handleSelect = (dog) => {
const found = […dogs, …EXTERNAL_DATA].find(d => d.id === dog.id);
if (found && !found.external) setDetail(found);
};

if (detail) return (
<div className=”app”>
<style>{S}</style>
<Hdr title={detail.callName} sub={detail.breed} onBack={() => setDetail(null)} />
<DogDetail dog={detail} dogs={dogs} heatRecords={heatRecords} onBack={() => setDetail(null)} onSelectDog={handleSelect} onGoHeat={(dog) => { setDetail(null); onGoHeat(dog); }} />
</div>
);

const filtered = dogs.filter(d => {
const mb = filter === ”all” || (filter === ”husky” ? d.breed?.includes(”ハスキー”) : d.breed?.includes(”コーギー”));
const ms = !search || d.callName.includes(search) || d.pedigreeName?.toLowerCase().includes(search.toLowerCase());
return mb && ms;
});

return (
<div className=”app”>
<style>{S}</style>
<Hdr title=”🐾 犬リスト” sub=”KENNEL LIST” onBack={onBack} />
<div className=”breed-tabs”>
{[[”all”,”すべて”],[”husky”,”🐺 ハスキー”],[”corgi”,”🐕 コーギー”]].map(([k,l]) => (
<button key={k} className={`breed-tab ${k} ${filter===k?”on”:””}`} onClick={() => setFilter(k)}>{l}</button>
))}
</div>
<div className=”search-wrap”><input className=”search-input” placeholder=”🔍 名前で検索…” value={search} onChange={e => setSearch(e.target.value)} /></div>
<div className=”dog-list”>
{filtered.map(d => {
const isH = d.breed?.includes(”ハスキー”);
return (
<div key={d.id} className={`dog-card ${isH?”husky”:”corgi”}`} onClick={() => setDetail(d)}>
<div className={`dog-av ${isH?”husky”:”corgi”}`}>{isH?”🐺”:”🐕”}</div>
<div className=”dog-info”>
<div className=”dog-callname”>{d.callName}</div>
<div className=”dog-ped”>{d.pedigreeName}</div>
<div className=”dog-badges”>
<span className={`badge ${d.gender===”メス”?”female”:”male”}`}>{d.gender}</span>
<span className=”badge age”>{getAge(d.birthdate)}</span>
<span className=”badge color”>{d.color}</span>
</div>
</div>
<span style={{color:”var(–text3)”,fontSize:18}}>›</span>
</div>
);
})}
{filtered.length === 0 && <div className=”empty”>該当する犬がいません</div>}
</div>
</div>
);
}

// ============================================================
// PUPPY EDIT MODAL
// ============================================================
function PuppyEditModal({ pup, onClose, onSave }) {
const [f, setF] = useState({ …pup });
const s = (k, v) => setF(p => ({ …p, [k]: v }));
return (
<Modal title={`#${pup.no} ${pup.gender} の詳細`} onClose={onClose}>
<div className=”field-row”>
<div className=”field”><label>性別</label><select value={f.gender} onChange={e => s(”gender”, e.target.value)}><option>オス</option><option>メス</option></select></div>
<div className=”field”><label>識別</label><input value={f.identifier||””} onChange={e => s(”identifier”, e.target.value)} placeholder=”赤リボン など” /></div>
</div>
<div className=”field”><label>毛色</label><input value={f.color||””} onChange={e => s(”color”, e.target.value)} placeholder=”例: BLACK & WHITE” /></div>
<div className=”field”><label>アイカラー（目が開いてから）</label><input value={f.eyeColor||””} onChange={e => s(”eyeColor”, e.target.value)} placeholder=”例: ブルー、ブラウン” /></div>
<div className=”field-row”>
<div className=”field”><label>出生体重(g)</label><input type=”number” value={f.birthWeight||””} onChange={e => s(”birthWeight”, e.target.value)} /></div>
<div className=”field”><label>コールネーム</label><input value={f.name||””} onChange={e => s(”name”, e.target.value)} /></div>
</div>
<div className=”field”><label>マイクロチップ番号</label><input value={f.chip||””} onChange={e => s(”chip”, e.target.value)} /></div>
<div className=”field”><label>備考</label><textarea value={f.note||””} onChange={e => s(”note”, e.target.value)} /></div>
<button className=”btn-save” onClick={() => { onSave(f); onClose(); }}>保存する</button>
</Modal>
);
}

// ============================================================
// HEAT SCREEN
// ============================================================
function HeatScreen({ dogs, heatRecords, setHeatRecords, puppies, setPuppies, onBack, initialDog }) {
const femaleDogs = dogs.filter(d => d.gender === ”メス”);
const [selDog, setSelDog] = useState(initialDog || femaleDogs[0]);
const [fabOpen, setFabOpen] = useState(false);
const [modal, setModal] = useState(null);
const [form, setForm] = useState({});
const [expanded, setExpanded] = useState({});
const [editPup, setEditPup] = useState(null);
const sf = (k, v) => setForm(f => ({ …f, [k]: v }));

const allMales = dogs.filter(d => d.gender === ”オス”).map(d => d.callName);

const dogRecs = heatRecords.filter(r => r.dogId === selDog?.id);
const heatOnly = dogRecs.filter(r => r.type === ”heat”).sort((a,b) => b.date.localeCompare(a.date));
const lastHeat = heatOnly[0];
const nextHeat = nextHeatEst(lastHeat?.date);
const daysToNext = nextHeat ? daysDiff(todayStr(), nextHeat) : null;
const breedingCount = […new Set(dogRecs.filter(r=>r.type===”breeding”).map(r=>r.group))].length;
const birthCount = dogRecs.filter(r=>r.type===”birth”).length;

const grouped = groupHeatRecords(dogRecs);
const byYear = grouped.reduce((acc, r) => { const y = r.date.slice(0,4); if (!acc[y]) acc[y]=[]; acc[y].push(r); return acc; }, {});
const years = Object.keys(byYear).sort((a,b) => b-a);

return (
<div className=”app”>
<style>{S}</style>
<Hdr title=”🌸 ヒート・交配管理” sub=”HEAT & BREEDING” onBack={onBack} />
<div className=”dog-selector”>
{femaleDogs.map(d => (
<button key={d.id} className={`dog-chip ${d.breed?.includes(”ハスキー”)?”husky”:”corgi”} ${selDog?.id===d.id?”on”:””}`} onClick={() => setSelDog(d)}>{d.callName}</button>
))}
</div>
{selDog && <>
<div className=”dog-hdr”>
<div style={{display:”flex”,justifyContent:”space-between”,alignItems:”flex-start”}}>
<div>
<div className=”dog-hdr-name”>{selDog.callName}</div>
<div style={{fontSize:11,color:”var(–text3)”,marginTop:2}}>{selDog.breed}</div>
</div>
<div className=”dog-hdr-stats”>
<div><div className=”dhs-num” style={{color:”var(–pink)”}}>{heatOnly.length}</div><div className=”dhs-lbl”>ヒート</div></div>
<div><div className=”dhs-num” style={{color:”var(–gold)”}}>{breedingCount}</div><div className=”dhs-lbl”>交配</div></div>
<div><div className=”dhs-num” style={{color:”var(–green)”}}>{birthCount}</div><div className=”dhs-lbl”>出産</div></div>
</div>
</div>
{/* 犬リストへの紐付けリンク */}
<div className=”link-row”>
<button className=”link-btn blue” onClick={() => onBack()}>🐾 犬リストへ戻る</button>
</div>
</div>
{nextHeat && (
<div className=”next-heat”>
<div><div className=”nh-label”>🌸 次回ヒート予測（約6ヶ月後）</div><div className=”nh-date”>{formatDate(nextHeat)}</div></div>
<div style={{textAlign:”right”}}>
{daysToNext !== null && (daysToNext > 0
? <div style={{fontSize:12}}>あと <strong style={{color:”var(–pink)”,fontSize:15}}>{daysToNext}</strong> 日</div>
: <div style={{color:”var(–pink)”,fontWeight:700}}>ヒート時期！</div>
)}
<div style={{fontSize:9,color:”var(–text3)”,marginTop:2}}>前回: {formatDate(lastHeat?.date)}</div>
</div>
</div>
)}
<div className=”timeline”>
{grouped.length === 0 && <div className=”empty”>記録がありません</div>}
{years.map((year, yi) => (
<div key={year}>
<div className=”tl-year”>{year}年</div>
{byYear[year].map((r, i) => {
const isLast = i === byYear[year].length-1 && yi === years.length-1;
const sc = r.status ? (STATUS_COLOR[r.status]||STATUS_COLOR[”交配中”]) : null;
const birthPups = puppies.filter(p => p.birthId === r.id);
const isExp = expanded[r.id];
return (
<div key={r.id} className=”tl-item”>
<div className=”tl-line”>
<div className={`tl-dot ${r.type}`}>{r.type===”heat”?”🌸”:r.type===”birth”?”🐶”:”💞”}</div>
{!isLast && <div className=”tl-vline”/>}
</div>
<div className=”tl-content”>
{r.type === ”heat” && (
<div className=”tl-card heat-card”>
<div className=”tl-date”>{formatDate(r.date)}</div>
<div className=”tl-type”>🌸 ヒート開始</div>
{r.note && <div className=”tl-note”>{r.note}</div>}
</div>
)}
{r.type === ”breeding” && (
<div className=”tl-card breeding-card”>
<div className=”tl-type”>💞 交配（× {r.fatherName}）</div>
<div style={{fontFamily:”DM Mono,monospace”,fontSize:11,color:”var(–text2)”,margin:”4px 0 2px”,lineHeight:1.7}}>
{r._groupRecs ? r._groupRecs.map((x,i) => {
const prev = i > 0 ? r._groupRecs[i-1].date : null;
return (prev && x.date.slice(0,7)===prev.slice(0,7)) ? x.date.slice(8) : formatDate(x.date);
}).join(”、”) : formatDate(r.date)}
</div>
<div className=”tl-detail”>計{r._groupRecs?r._groupRecs.length:1}回 · {r._groupRecs?[…new Set(r._groupRecs.map(x=>x.method))].join(”・”):r.method}</div>
{sc && <span className=”status-badge” style={{background:sc.bg,color:sc.text,borderColor:sc.border}}>{r.status}</span>}
{r.note && <div className=”tl-note”>{r.note}</div>}
</div>
)}
{r.type === ”birth” && (
<div className=”tl-card birth-card”>
<div className=”tl-date”>{formatDate(r.date)}</div>
<div className=”tl-type”>🐶 出産（× {r.fatherName}）</div>
<div className=”tl-detail”>{r.birthMethod}{r.pregnancyDays?` · 妊娠${r.pregnancyDays}日`:””}</div>
{r.totalPups != null && (
<div className=”birth-summary” onClick={() => setExpanded(e => ({…e,[r.id]:!e[r.id]}))}>
<div style={{display:”flex”,alignItems:”baseline”,justifyContent:”space-between”}}>
<div style={{display:”flex”,alignItems:”baseline”,gap:5}}>
<span className=”birth-num”>{r.totalPups}</span>
<span style={{fontSize:12,color:”var(–text2)”}}>頭</span>
</div>
<span style={{fontSize:11,color:”var(–green)”}}>{isExp?”▲ 閉じる”:”▼ 仔犬を見る”}</span>
</div>
<div className=”birth-detail”>♂ オス {r.malePups}頭　♀ メス {r.femalePups}頭{r.stillborn>0?`　死産 ${r.stillborn}頭`:””}</div>
</div>
)}
{isExp && (
<div>
{birthPups.length > 0 ? (
<div className=”pup-grid”>
{birthPups.map(p => (
<div key={p.id} className={`pup-chip ${p.gender===”オス”?”pm”:”pf”}`} onClick={() => setEditPup(p)}>
<div className=”pup-chip-no”>#{p.no}</div>
<div className=”pup-chip-gender” style={{color:p.gender===”オス”?”var(–blue)”:”var(–pink)”}}>{p.gender===”オス”?”♂”:”♀”} {p.gender}</div>
<div className=”pup-chip-color”>{p.color||”未入力”}</div>
{p.identifier && <div className=”pup-chip-id”>{p.identifier}</div>}
</div>
))}
</div>
) : <div style={{fontSize:11,color:”var(–text3)”,textAlign:”center”,padding:”10px 0”}}>仔犬情報未登録</div>}
<button className=”add-pup-btn” onClick={() => {
const np = {id:`p_${Date.now()}`,birthId:r.id,no:birthPups.length+1,gender:”メス”,color:””,eyeColor:””,identifier:””,birthWeight:””,name:””,chip:””,note:””};
setPuppies(ps => […ps, np]); setEditPup(np);
}}>＋ 仔犬を追加</button>
</div>
)}
{r.note && <div className=”tl-note”>{r.note}</div>}
</div>
)}
</div>
</div>
);
})}
</div>
))}
</div>
</>}

```
  <div className=”fab-wrap”>
    {fabOpen && <>
      <button className=”fab-sub breeding” onClick={() => { setForm({date:todayStr(),method:”自然交配”}); setModal(”breeding”); setFabOpen(false); }}>💞 交配を記録</button>
      <button className=”fab-sub heat” onClick={() => { setForm({date:todayStr()}); setModal(”heat”); setFabOpen(false); }}>🌸 ヒートを記録</button>
    </>}
    <button className=”fab” onClick={() => setFabOpen(o => !o)}>{fabOpen?”✕”:”＋”}</button>
  </div>

  {modal === ”heat” && (
    <Modal title={`🌸 ヒートを記録 — ${selDog?.callName}`} onClose={() => setModal(null)}>
      <div className=”field”><label>ヒート開始日</label><input type=”date” value={form.date||””} onChange={e => sf(”date”,e.target.value)} /></div>
      <div className=”field”><label>メモ</label><textarea value={form.note||””} onChange={e => sf(”note”,e.target.value)} /></div>
      <button className=”btn-save pink” onClick={() => { if (!form.date) return; setHeatRecords(rs => [...rs,{id:`r${Date.now()}`,dogId:selDog.id,type:”heat”,date:form.date,note:form.note||””}]); setModal(null); }}>記録する</button>
    </Modal>
  )}
  {modal === ”breeding” && (
    <Modal title={`💞 交配を記録 — ${selDog?.callName}`} onClose={() => setModal(null)}>
      <div className=”field”><label>父犬</label>
        <select value={form.fatherName||””} onChange={e => sf(”fatherName”,e.target.value)}>
          <option value=””>選択してください</option>
          {allMales.map(m => <option key={m} value={m}>{m}</option>)}
          <option value=”__manual__”>外部犬（手入力）</option>
        </select>
      </div>
      {form.fatherName === ”__manual__” && <div className=”field”><label>父犬の名前</label><input value={form.fatherNameManual||””} onChange={e => sf(”fatherNameManual”,e.target.value)} /></div>}
      <div className=”field-row”>
        <div className=”field”><label>交配日</label><input type=”date” value={form.date||””} onChange={e => sf(”date”,e.target.value)} /></div>
        <div className=”field”><label>交配方法</label><select value={form.method||”自然交配”} onChange={e => sf(”method”,e.target.value)}><option>自然交配</option><option>人工交配</option></select></div>
      </div>
      <div className=”field”><label>メモ</label><textarea value={form.note||””} onChange={e => sf(”note”,e.target.value)} /></div>
      <button className=”btn-save” onClick={() => {
        const fn = form.fatherName===”__manual__”?(form.fatherNameManual||”外部犬”):form.fatherName;
        if (!fn||!form.date) return;
        setHeatRecords(rs => [...rs,{id:`r${Date.now()}`,dogId:selDog.id,type:”breeding”,date:form.date,fatherName:fn,method:form.method||”自然交配”,status:”交配中”,group:`g_${Date.now()}`,note:form.note||””}]);
        setModal(null); setFabOpen(false);
      }}>記録する</button>
    </Modal>
  )}
  {editPup && <PuppyEditModal pup={editPup} onClose={() => setEditPup(null)} onSave={updated => { setPuppies(ps => ps.map(p => p.id===updated.id?updated:p)); setEditPup(null); }} />}
</div>
```

);
}

// ============================================================
// DOG MODULE MENU
// ============================================================
function DogModule({ dogs, heatRecords, setHeatRecords, puppies, setPuppies, onBack }) {
const [screen, setScreen] = useState(null);
const [heatInitDog, setHeatInitDog] = useState(null);

const goHeat = (dog) => { setHeatInitDog(dog); setScreen(”heat”); };

if (screen === ”list”) return <DogListScreen dogs={dogs} heatRecords={heatRecords} onBack={() => setScreen(null)} onSelectDog={() => {}} onGoHeat={goHeat} />;
if (screen === ”heat”) return <HeatScreen dogs={dogs} heatRecords={heatRecords} setHeatRecords={setHeatRecords} puppies={puppies} setPuppies={setPuppies} onBack={() => setScreen(null)} initialDog={heatInitDog} />;

return (
<div className=”app”>
<style>{S}</style>
<Hdr title=”🐕 犬の管理” sub=”DOG MANAGEMENT” onBack={onBack} />
<div className=”menu-list”>
<div className=”menu-item” onClick={() => setScreen(”list”)}>
<div className=”menu-item-icon” style={{background:”var(–blue-dim)”}}>🐾</div>
<div><div className=”menu-item-name”>犬リスト・家系図</div><div className=”menu-item-desc”>個体情報・血統・3世代家系図</div></div>
<span style={{color:”var(–text3)”,fontSize:18,marginLeft:”auto”}}>›</span>
</div>
<div className=”menu-item” onClick={() => { setHeatInitDog(null); setScreen(”heat”); }}>
<div className=”menu-item-icon” style={{background:”var(–pink-dim)”}}>🌸</div>
<div><div className=”menu-item-name”>ヒート・交配・出産</div><div className=”menu-item-desc”>ヒート管理・交配記録・仔犬詳細</div></div>
<span style={{color:”var(–text3)”,fontSize:18,marginLeft:”auto”}}>›</span>
</div>
</div>
</div>
);
}

// ============================================================
// CHICKEN DATA
// ============================================================
const FLOCKS_DATA = [
{ id: ”f1”, breed: ”烏骨鶏（交雑種）”, male: 3,  female: 12, note: ”” },
{ id: ”f2”, breed: ”黒烏骨鶏”,         male: 2,  female: 1,  note: ”ブランド化予定” },
{ id: ”f3”, breed: ”岡崎おうはん”,     male: 1,  female: 2,  note: ”” },
];
const PRODUCTS_DATA = [
{ id: ”pr1”, flockId: ”f1”, name: ”烏骨鶏卵 6個入り”,      count: 6,  price: 2000 },
{ id: ”pr2”, flockId: ”f1”, name: ”烏骨鶏卵 10個入り”,     count: 10, price: 2800 },
{ id: ”pr3”, flockId: ”f3”, name: ”岡崎おうはん卵 10個入り”, count: 10, price: 2180 },
];
const EGGS_DATA = [
{ id: ”e1”, flockId: ”f1”, date: ”2026-05-09”, count: 10, note: ”” },
{ id: ”e2”, flockId: ”f3”, date: ”2026-05-09”, count: 2,  note: ”” },
{ id: ”e3”, flockId: ”f1”, date: ”2026-05-08”, count: 9,  note: ”” },
{ id: ”e4”, flockId: ”f3”, date: ”2026-05-08”, count: 2,  note: ”” },
];
const HATCH_DATA = [
{ id: ”h1”, flockId: ”f1”, setDate: ”2026-03-01”, setCount: 12, hatchDate: ”2026-03-22”, hatchCount: 9, male: 4, female: 5, note: ”自家孵化” },
];
const PURCHASE_DATA = [
{ id: ”pu1”, flockId: ”f2”, date: ”2025-12-01”, type: ”個体”, count: 3, from: ”〇〇農場”, note: ”黒烏骨鶏3羽導入” },
];
const CUSTOMERS_DATA = [
{ id: ”c1”, name: ”田中様”, contact: ”example@mail.com”, address: ””, note: ”ストアーズ” },
];
const SALES_DATA = [
{ id: ”s1”, customerId: ”c1”, productId: ”pr1”, date: ”2026-04-20”, qty: 2, total: 4000, channel: ”ストアーズ”, note: ”” },
{ id: ”s2”, customerId: ”c1”, productId: ”pr2”, date: ”2026-05-01”, qty: 1, total: 2800, channel: ”ストアーズ”, note: ”” },
];

// ============================================================
// CHICKEN MODULE
// ============================================================
function ChickenModule({ onBack }) {
const [flocks, setFlocks]       = useState(FLOCKS_DATA);
const [products, setProducts]   = useState(PRODUCTS_DATA);
const [eggs, setEggs]           = useState(EGGS_DATA);
const [hatches, setHatches]     = useState(HATCH_DATA);
const [purchases, setPurchases] = useState(PURCHASE_DATA);
const [customers, setCustomers] = useState(CUSTOMERS_DATA);
const [sales, setSales]         = useState(SALES_DATA);
const [tab, setTab]             = useState(”flock”);
const [modal, setModal]         = useState(null);
const [form, setForm]           = useState({});
const sf = (k, v) => setForm(f => ({ …f, [k]: v }));

const totalBirds = flocks.reduce((s, f) => s + f.male + f.female, 0);
const todayEggs  = eggs.filter(e => e.date === todayStr()).reduce((s, e) => s + e.count, 0);
const monthSales = sales.filter(s => s.date.slice(0,7) === todayStr().slice(0,7)).reduce((s, r) => s + r.total, 0);

const TABS = [
{ id: ”flock”,    label: ”群れ” },
{ id: ”eggs”,     label: ”産卵” },
{ id: ”hatch”,    label: ”孵化” },
{ id: ”purchase”, label: ”入荷” },
{ id: ”sales”,    label: ”販売” },
{ id: ”customer”, label: ”顧客” },
];

const getFlockName = id => flocks.find(f => f.id === id)?.breed || ”不明”;
const getProductName = id => products.find(p => p.id === id)?.name || ”不明”;
const getCustomerName = id => customers.find(c => c.id === id)?.name || ”不明”;

return (
<div className=”app”>
<style>{S}</style>
<Hdr title=”🐓 鶏の管理” sub=”CHICKEN MANAGEMENT” onBack={onBack} />

```
  {/* サマリー */}
  <div style={{display:”grid”,gridTemplateColumns:”1fr 1fr 1fr”,gap:8,padding:”12px 20px 0”}}>
    {[
      { num: totalBirds, lbl: ”総羽数”,    color: ”var(--green)” },
      { num: todayEggs,  lbl: ”本日産卵”,  color: ”var(--gold)”  },
      { num: `¥${monthSales.toLocaleString()}`, lbl: ”今月売上”, color: ”var(--blue)”, small: true },
    ].map((s,i) => (
      <div key={i} style={{background:”var(--surface)”,border:”1px solid var(--border)”,borderRadius:8,padding:”10px 8px”,textAlign:”center”}}>
        <div style={{fontSize:s.small?14:20,fontWeight:900,fontFamily:”DM Mono”,color:s.color}}>{s.num}</div>
        <div style={{fontSize:10,color:”var(--text3)”,marginTop:2}}>{s.lbl}</div>
      </div>
    ))}
  </div>

  {/* タブ */}
  <div style={{display:”flex”,gap:6,padding:”12px 20px 0”,overflowX:”auto”,scrollbarWidth:”none”}}>
    {TABS.map(t => (
      <button key={t.id} style={{padding:”7px 13px”,borderRadius:20,border:`1px solid ${tab===t.id?”var(--green)”:”var(--border2)”}`,background:tab===t.id?”var(--green-dim)”:”none”,fontFamily:”Noto Sans JP,sans-serif”,fontSize:12,fontWeight:700,cursor:”pointer”,color:tab===t.id?”var(--green)”:”var(--text3)”,whiteSpace:”nowrap”,flexShrink:0}} onClick={() => setTab(t.id)}>{t.label}</button>
    ))}
  </div>

  <div style={{padding:”12px 20px”,paddingBottom:100,flex:1,overflowY:”auto”}}>

    {/* 群れ */}
    {tab === ”flock” && <>
      {flocks.map(f => (
        <div key={f.id} className=”flock-card” style={{cursor:”default”}}>
          <div style={{display:”flex”,justifyContent:”space-between”,alignItems:”flex-start”}}>
            <div>
              <div className=”flock-name”>{f.breed}</div>
              {f.note && <div style={{fontSize:11,color:”var(--gold)”,marginTop:2}}>{f.note}</div>}
              <div style={{display:”flex”,gap:10,marginTop:6}}>
                <span style={{fontSize:12,color:”var(--blue)”}}>♂ オス {f.male}羽</span>
                <span style={{fontSize:12,color:”var(--pink)”}}>♀ メス {f.female}羽</span>
              </div>
            </div>
            <div style={{textAlign:”right”}}>
              <div className=”flock-count”>{f.male+f.female}</div>
              <div style={{fontSize:10,color:”var(--text3)”}}>羽</div>
            </div>
          </div>
        </div>
      ))}
      <button style={{width:”100%”,padding:”11px”,borderRadius:”var(--r-sm)”,border:”1px dashed var(--border2)”,background:”none”,fontFamily:”Noto Sans JP,sans-serif”,fontSize:13,color:”var(--text3)”,cursor:”pointer”,marginTop:4}} onClick={() => { setForm({male:0,female:0}); setModal(”flock”); }}>＋ 羽数を更新する</button>
    </>}

    {/* 産卵 */}
    {tab === ”eggs” && <>
      <div style={{background:”var(--green-dim)”,border:”1px solid rgba(80,180,120,0.3)”,borderRadius:”var(--r)”,padding:”12px 16px”,marginBottom:14}}>
        <div style={{fontSize:11,color:”var(--green)”,fontWeight:700,marginBottom:4}}>🥚 本日の産卵合計</div>
        <div style={{fontSize:28,fontWeight:900,fontFamily:”DM Mono”,color:”var(--green)”}}>{todayEggs}<span style={{fontSize:14,marginLeft:4}}>個</span></div>
      </div>
      {eggs.sort((a,b)=>b.date.localeCompare(a.date)).map(e => (
        <div key={e.id} className=”egg-row”>
          <span style={{fontWeight:600,fontSize:13}}>{getFlockName(e.flockId)}</span>
          <span style={{fontSize:11,color:”var(--text3)”,fontFamily:”DM Mono”}}>{formatDate(e.date)}</span>
          <span className=”egg-count”>{e.count}個</span>
        </div>
      ))}
    </>}

    {/* 孵化 */}
    {tab === ”hatch” && <>
      {hatches.length === 0 && <div className=”empty”>孵化記録なし</div>}
      {hatches.map(h => (
        <div key={h.id} style={{background:”var(--surface)”,border:”1px solid var(--border)”,borderRadius:”var(--r)”,padding:”13px 15px”,marginBottom:10}}>
          <div style={{display:”flex”,justifyContent:”space-between”,marginBottom:6}}>
            <span style={{fontWeight:700,fontSize:14}}>{getFlockName(h.flockId)}</span>
            <span style={{fontSize:11,color:”var(--text3)”,fontFamily:”DM Mono”}}>{formatDate(h.setDate)}</span>
          </div>
          <div style={{display:”grid”,gridTemplateColumns:”1fr 1fr 1fr”,gap:8}}>
            {[[”セット”,h.setCount,”個”],[”孵化”,h.hatchCount,”羽”],[”孵化率”,Math.round(h.hatchCount/h.setCount*100),”%”]].map(([l,v,u],i)=>(
              <div key={i} style={{textAlign:”center”,background:”var(--surface2)”,borderRadius:6,padding:”7px 4px”}}>
                <div style={{fontSize:16,fontWeight:900,fontFamily:”DM Mono”,color:”var(--green)”}}>{v}{u}</div>
                <div style={{fontSize:10,color:”var(--text3)”}}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{display:”flex”,gap:12,marginTop:8,fontSize:12}}>
            <span style={{color:”var(--blue)”}}>♂ {h.male}羽</span>
            <span style={{color:”var(--pink)”}}>♀ {h.female}羽</span>
            {h.note && <span style={{color:”var(--text3)”}}>{h.note}</span>}
          </div>
        </div>
      ))}
    </>}

    {/* 入荷 */}
    {tab === ”purchase” && <>
      {purchases.length === 0 && <div className=”empty”>入荷記録なし</div>}
      {purchases.map(p => (
        <div key={p.id} style={{background:”var(--surface)”,border:”1px solid var(--border)”,borderRadius:”var(--r)”,padding:”13px 15px”,marginBottom:10}}>
          <div style={{display:”flex”,justifyContent:”space-between”}}>
            <div>
              <div style={{fontWeight:700,fontSize:14}}>{getFlockName(p.flockId)}</div>
              <div style={{fontSize:12,color:”var(--text2)”,marginTop:3}}>{p.type} · {p.count}{p.type===”個体”?”羽”:”個”}</div>
              <div style={{fontSize:11,color:”var(--text3)”,marginTop:2}}>仕入先: {p.from}</div>
              {p.note && <div style={{fontSize:11,color:”var(--text3)”,marginTop:2}}>{p.note}</div>}
            </div>
            <div style={{fontSize:11,color:”var(--text3)”,fontFamily:”DM Mono”}}>{formatDate(p.date)}</div>
          </div>
        </div>
      ))}
    </>}

    {/* 販売 */}
    {tab === ”sales” && <>
      <div style={{background:”var(--blue-dim)”,border:”1px solid rgba(91,143,201,0.3)”,borderRadius:”var(--r)”,padding:”12px 16px”,marginBottom:14}}>
        <div style={{fontSize:11,color:”var(--blue)”,fontWeight:700,marginBottom:4}}>💰 今月の売上</div>
        <div style={{fontSize:26,fontWeight:900,fontFamily:”DM Mono”,color:”var(--blue)”}}>¥{monthSales.toLocaleString()}</div>
      </div>
      <div style={{marginBottom:10}}>
        <div style={{fontSize:11,fontWeight:700,color:”var(--text3)”,marginBottom:8}}>商品ラインナップ</div>
        {products.map(p => (
          <div key={p.id} style={{display:”flex”,justifyContent:”space-between”,alignItems:”center”,padding:”8px 12px”,background:”var(--surface)”,border:”1px solid var(--border)”,borderRadius:”var(--r-sm)”,marginBottom:6}}>
            <div>
              <div style={{fontSize:13,fontWeight:600}}>{p.name}</div>
              <div style={{fontSize:11,color:”var(--text3)”}}>{getFlockName(p.flockId)}</div>
            </div>
            <div style={{fontFamily:”DM Mono”,fontWeight:700,color:”var(--gold)”}}>¥{p.price.toLocaleString()}</div>
          </div>
        ))}
      </div>
      <div style={{fontSize:11,fontWeight:700,color:”var(--text3)”,marginBottom:8}}>販売記録</div>
      {sales.sort((a,b)=>b.date.localeCompare(a.date)).map(s => (
        <div key={s.id} style={{background:”var(--surface)”,border:”1px solid var(--border)”,borderRadius:”var(--r)”,padding:”11px 14px”,marginBottom:8}}>
          <div style={{display:”flex”,justifyContent:”space-between”}}>
            <div>
              <div style={{fontWeight:700,fontSize:13}}>{getCustomerName(s.customerId)}</div>
              <div style={{fontSize:12,color:”var(--text2)”,marginTop:2}}>{getProductName(s.productId)} × {s.qty}</div>
              <div style={{fontSize:10,color:”var(--text3)”,marginTop:2}}>{s.channel} · {formatDate(s.date)}</div>
            </div>
            <div style={{fontFamily:”DM Mono”,fontWeight:700,color:”var(--green)”,fontSize:15}}>¥{s.total.toLocaleString()}</div>
          </div>
        </div>
      ))}
    </>}

    {/* 顧客 */}
    {tab === ”customer” && <>
      {customers.map(c => {
        const cSales = sales.filter(s => s.customerId === c.id);
        const cTotal = cSales.reduce((s, r) => s + r.total, 0);
        return (
          <div key={c.id} style={{background:”var(--surface)”,border:”1px solid var(--border)”,borderLeft:”3px solid var(--green)”,borderRadius:”var(--r)”,padding:”13px 15px”,marginBottom:10}}>
            <div style={{display:”flex”,justifyContent:”space-between”}}>
              <div>
                <div style={{fontWeight:700,fontSize:15}}>{c.name}</div>
                <div style={{fontSize:11,color:”var(--text3)”,marginTop:2}}>{c.contact}</div>
                {c.note && <div style={{fontSize:11,color:”var(--gold)”,marginTop:2}}>{c.note}</div>}
              </div>
              <div style={{textAlign:”right”}}>
                <div style={{fontFamily:”DM Mono”,fontWeight:700,color:”var(--green)”}}>¥{cTotal.toLocaleString()}</div>
                <div style={{fontSize:10,color:”var(--text3)”,marginTop:2}}>累計 {cSales.length}回</div>
              </div>
            </div>
            {cSales.length > 0 && (
              <div style={{marginTop:8,paddingTop:8,borderTop:”1px solid var(--border)”}}>
                <div style={{fontSize:10,color:”var(--text3)”,marginBottom:5}}>購入履歴</div>
                {cSales.sort((a,b)=>b.date.localeCompare(a.date)).map(s => (
                  <div key={s.id} style={{display:”flex”,justifyContent:”space-between”,fontSize:12,padding:”3px 0”}}>
                    <span style={{color:”var(--text2)”}}>{getProductName(s.productId)} ×{s.qty}</span>
                    <span style={{fontFamily:”DM Mono”,color:”var(--text3)”}}>{formatDate(s.date)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </>}
  </div>

  {/* FAB */}
  <button className=”fab” style={{position:”fixed”,bottom:26,right:22}} onClick={() => {
    if (tab===”eggs”)     { setForm({date:todayStr(),flockId:flocks[0]?.id}); setModal(”egg”); }
    if (tab===”hatch”)    { setForm({setDate:todayStr(),flockId:flocks[0]?.id}); setModal(”hatch”); }
    if (tab===”purchase”) { setForm({date:todayStr(),flockId:flocks[0]?.id,type:”個体”}); setModal(”purchase”); }
    if (tab===”sales”)    { setForm({date:todayStr(),customerId:customers[0]?.id,productId:products[0]?.id,qty:1,channel:”ストアーズ”}); setModal(”sale”); }
    if (tab===”customer”) { setForm({}); setModal(”customer”); }
  }}>＋</button>

  {/* MODALS */}
  {modal === ”flock” && (
    <Modal title=”羽数を更新” onClose={() => setModal(null)}>
      <div className=”field”><label>品種</label>
        <select value={form.flockId||””} onChange={e => sf(”flockId”,e.target.value)}>
          {flocks.map(f => <option key={f.id} value={f.id}>{f.breed}</option>)}
        </select>
      </div>
      <div className=”field-row”>
        <div className=”field”><label>オス羽数</label><input type=”number” value={form.male||0} onChange={e => sf(”male”,parseInt(e.target.value)||0)} /></div>
        <div className=”field”><label>メス羽数</label><input type=”number” value={form.female||0} onChange={e => sf(”female”,parseInt(e.target.value)||0)} /></div>
      </div>
      <div className=”field”><label>メモ</label><textarea value={form.note||””} onChange={e => sf(”note”,e.target.value)} /></div>
      <button className=”btn-save” onClick={() => {
        setFlocks(fs => fs.map(f => f.id===form.flockId ? {...f,male:form.male,female:form.female} : f));
        setModal(null);
      }}>更新する</button>
    </Modal>
  )}
  {modal === ”egg” && (
    <Modal title=”🥚 産卵を記録” onClose={() => setModal(null)}>
      <div className=”field”><label>品種</label>
        <select value={form.flockId||””} onChange={e => sf(”flockId”,e.target.value)}>
          {flocks.map(f => <option key={f.id} value={f.id}>{f.breed}</option>)}
        </select>
      </div>
      <div className=”field”><label>日付</label><input type=”date” value={form.date||””} onChange={e => sf(”date”,e.target.value)} /></div>
      <div className=”field”><label>産卵数</label><input type=”number” value={form.count||””} onChange={e => sf(”count”,parseInt(e.target.value)||0)} /></div>
      <div className=”field”><label>メモ</label><textarea value={form.note||””} onChange={e => sf(”note”,e.target.value)} /></div>
      <button className=”btn-save” onClick={() => {
        if (!form.flockId||!form.date) return;
        setEggs(es => [...es, {id:`e${Date.now()}`,flockId:form.flockId,date:form.date,count:form.count||0,note:form.note||””}]);
        setModal(null);
      }}>記録する</button>
    </Modal>
  )}
  {modal === ”hatch” && (
    <Modal title=”🐣 孵化を記録” onClose={() => setModal(null)}>
      <div className=”field”><label>品種</label>
        <select value={form.flockId||””} onChange={e => sf(”flockId”,e.target.value)}>
          {flocks.map(f => <option key={f.id} value={f.id}>{f.breed}</option>)}
        </select>
      </div>
      <div className=”field-row”>
        <div className=”field”><label>セット日</label><input type=”date” value={form.setDate||””} onChange={e => sf(”setDate”,e.target.value)} /></div>
        <div className=”field”><label>セット数</label><input type=”number” value={form.setCount||””} onChange={e => sf(”setCount”,parseInt(e.target.value)||0)} /></div>
      </div>
      <div className=”field-row”>
        <div className=”field”><label>孵化日</label><input type=”date” value={form.hatchDate||””} onChange={e => sf(”hatchDate”,e.target.value)} /></div>
        <div className=”field”><label>孵化数</label><input type=”number” value={form.hatchCount||””} onChange={e => sf(”hatchCount”,parseInt(e.target.value)||0)} /></div>
      </div>
      <div className=”field-row”>
        <div className=”field”><label>オス</label><input type=”number” value={form.male||””} onChange={e => sf(”male”,parseInt(e.target.value)||0)} /></div>
        <div className=”field”><label>メス</label><input type=”number” value={form.female||””} onChange={e => sf(”female”,parseInt(e.target.value)||0)} /></div>
      </div>
      <div className=”field”><label>メモ</label><textarea value={form.note||””} onChange={e => sf(”note”,e.target.value)} /></div>
      <button className=”btn-save” onClick={() => {
        if (!form.flockId||!form.setDate) return;
        setHatches(hs => [...hs, {id:`h${Date.now()}`,flockId:form.flockId,setDate:form.setDate,setCount:form.setCount||0,hatchDate:form.hatchDate||””,hatchCount:form.hatchCount||0,male:form.male||0,female:form.female||0,note:form.note||””}]);
        setModal(null);
      }}>記録する</button>
    </Modal>
  )}
  {modal === ”purchase” && (
    <Modal title=”📦 入荷を記録” onClose={() => setModal(null)}>
      <div className=”field”><label>品種</label>
        <select value={form.flockId||””} onChange={e => sf(”flockId”,e.target.value)}>
          {flocks.map(f => <option key={f.id} value={f.id}>{f.breed}</option>)}
        </select>
      </div>
      <div className=”field-row”>
        <div className=”field”><label>日付</label><input type=”date” value={form.date||””} onChange={e => sf(”date”,e.target.value)} /></div>
        <div className=”field”><label>種類</label>
          <select value={form.type||”個体”} onChange={e => sf(”type”,e.target.value)}>
            <option>個体</option><option>卵（孵化用）</option>
          </select>
        </div>
      </div>
      <div className=”field-row”>
        <div className=”field”><label>数量</label><input type=”number” value={form.count||””} onChange={e => sf(”count”,parseInt(e.target.value)||0)} /></div>
        <div className=”field”><label>仕入先</label><input value={form.from||””} onChange={e => sf(”from”,e.target.value)} /></div>
      </div>
      <div className=”field”><label>メモ</label><textarea value={form.note||””} onChange={e => sf(”note”,e.target.value)} /></div>
      <button className=”btn-save” onClick={() => {
        if (!form.flockId||!form.date) return;
        setPurchases(ps => [...ps, {id:`pu${Date.now()}`,flockId:form.flockId,date:form.date,type:form.type||”個体”,count:form.count||0,from:form.from||””,note:form.note||””}]);
        setModal(null);
      }}>記録する</button>
    </Modal>
  )}
  {modal === ”sale” && (
    <Modal title=”💰 販売を記録” onClose={() => setModal(null)}>
      <div className=”field”><label>顧客</label>
        <select value={form.customerId||””} onChange={e => sf(”customerId”,e.target.value)}>
          {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div className=”field”><label>商品</label>
        <select value={form.productId||””} onChange={e => {
          const p = products.find(p => p.id===e.target.value);
          sf(”productId”,e.target.value);
          if (p) sf(”unitPrice”,p.price);
        }}>
          {products.map(p => <option key={p.id} value={p.id}>{p.name} ¥{p.price.toLocaleString()}</option>)}
        </select>
      </div>
      <div className=”field-row”>
        <div className=”field”><label>日付</label><input type=”date” value={form.date||””} onChange={e => sf(”date”,e.target.value)} /></div>
        <div className=”field”><label>数量</label><input type=”number” value={form.qty||1} onChange={e => sf(”qty”,parseInt(e.target.value)||1)} /></div>
      </div>
      <div className=”field”><label>販売チャネル</label>
        <select value={form.channel||”ストアーズ”} onChange={e => sf(”channel”,e.target.value)}>
          <option>ストアーズ</option><option>BASE</option><option>無人販売所</option><option>その他</option>
        </select>
      </div>
      <div className=”field”><label>メモ</label><textarea value={form.note||””} onChange={e => sf(”note”,e.target.value)} /></div>
      <button className=”btn-save” onClick={() => {
        if (!form.customerId||!form.productId||!form.date) return;
        const p = products.find(p => p.id===form.productId);
        const total = (p?.price||0) * (form.qty||1);
        setSales(ss => [...ss, {id:`s${Date.now()}`,customerId:form.customerId,productId:form.productId,date:form.date,qty:form.qty||1,total,channel:form.channel||”ストアーズ”,note:form.note||””}]);
        setModal(null);
      }}>記録する</button>
    </Modal>
  )}
  {modal === ”customer” && (
    <Modal title=”👤 顧客を追加” onClose={() => setModal(null)}>
      <div className=”field”><label>お名前</label><input value={form.name||””} onChange={e => sf(”name”,e.target.value)} placeholder=”例: 田中様” /></div>
      <div className=”field”><label>連絡先（メールなど）</label><input value={form.contact||””} onChange={e => sf(”contact”,e.target.value)} /></div>
      <div className=”field”><label>住所</label><input value={form.address||””} onChange={e => sf(”address”,e.target.value)} /></div>
      <div className=”field”><label>メモ（販売チャネルなど）</label><textarea value={form.note||””} onChange={e => sf(”note”,e.target.value)} /></div>
      <button className=”btn-save” onClick={() => {
        if (!form.name) return;
        setCustomers(cs => [...cs, {id:`c${Date.now()}`,name:form.name,contact:form.contact||””,address:form.address||””,note:form.note||””}]);
        setModal(null);
      }}>登録する</button>
    </Modal>
  )}
</div>
```

);
}

// ============================================================
// HOME
// ============================================================
const GAS_URL = ”https://script.google.com/macros/s/AKfycbzCp753WsMX0hS80yVw9FYWimuuVntgFEzA9hTewM-t1CO4oLOZvywxOSeFYntPcmT2/exec”;

export default function App() {
const [dogs, setDogs] = useState(DOGS_DATA);
const [heatRecords, setHeatRecords] = useState(HEAT_RECORDS_DATA);
const [puppies, setPuppies] = useState(PUPPIES_DATA);
const [screen, setScreen] = useState(”home”);
const [syncStatus, setSyncStatus] = useState(null); // null | ”saving” | ”saved” | ”error”

const now = new Date();
const dateStr = `${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,”0”)}/${String(now.getDate()).padStart(2,”0”)}（${”日月火水木金土”[now.getDay()]}）`;

// スプレッドシートに保存
const saveToSheets = async () => {
setSyncStatus(”saving”);
try {
const payload = { dogs, heatRecords, puppies };
const res = await fetch(GAS_URL, {
method: ”POST”,
body: JSON.stringify({ action: ”saveAll”, payload }),
});
const data = await res.json();
if (data.success) {
setSyncStatus(”saved”);
setTimeout(() => setSyncStatus(null), 3000);
} else {
setSyncStatus(”error”);
setTimeout(() => setSyncStatus(null), 3000);
}
} catch (err) {
setSyncStatus(”error”);
setTimeout(() => setSyncStatus(null), 3000);
}
};

const syncStatusStyle = {
saving: { bg: ”rgba(201,168,76,0.15)”, color: ”var(–gold)”,  text: ”⏳ 保存中…” },
saved:  { bg: ”rgba(80,180,120,0.15)”, color: ”var(–green)”, text: ”✅ 保存完了！” },
error:  { bg: ”rgba(201,96,96,0.15)”,  color: ”#c96060”,      text: ”❌ エラーが発生しました” },
};

if (screen === ”dogs”) return <><style>{S}</style><DogModule dogs={dogs} heatRecords={heatRecords} setHeatRecords={setHeatRecords} puppies={puppies} setPuppies={setPuppies} onBack={() => setScreen(”home”)} /></>;
if (screen === ”chickens”) return <><style>{S}</style><ChickenModule onBack={() => setScreen(”home”)} /></>;

return (
<div className=”app”>
<style>{S}</style>
<Hdr title=”🌾 ファーム管理” sub=”FARM MANAGEMENT” />
<div className=”home-hero”>
<div className=”home-eyebrow”>My Farm</div>
<div className=”home-title”>わんこと鶏の<br /><em>管理帳</em></div>
<div className=”home-date”>{dateStr}</div>
</div>

```
  <div className=”home-cards”>
    <div className=”home-card dog” onClick={() => setScreen(”dogs”)}>
      <div className=”home-card-icon dog”>🐕</div>
      <div className=”home-card-info”>
        <div className=”home-card-name”>犬の管理</div>
        <div className=”home-card-desc”>犬リスト・家系図・ヒート・交配・出産</div>
      </div>
      <span style={{color:”var(--text3)”,fontSize:22}}>›</span>
    </div>
    <div className=”home-card chicken” onClick={() => setScreen(”chickens”)}>
      <div className=”home-card-icon chicken”>🐓</div>
      <div className=”home-card-info”>
        <div className=”home-card-name”>鶏の管理</div>
        <div className=”home-card-desc”>群れ・産卵・飼料・販売・顧客</div>
      </div>
      <span style={{color:”var(--text3)”,fontSize:22}}>›</span>
    </div>

    {/* スプレッドシート同期ボタン */}
    <div style={{marginTop:8}}>
      <button
        onClick={saveToSheets}
        disabled={syncStatus === ”saving”}
        style={{
          width:”100%”, padding:”13px”, borderRadius:”var(--r)”,
          border:”1px solid rgba(201,168,76,0.4)”,
          background: syncStatus ? syncStatusStyle[syncStatus].bg : ”var(--gold-dim)”,
          color: syncStatus ? syncStatusStyle[syncStatus].color : ”var(--gold)”,
          fontFamily:”Noto Sans JP,sans-serif”, fontSize:14, fontWeight:700,
          cursor: syncStatus===”saving” ? ”not-allowed” : ”pointer”,
          transition:”all 0.2s”,
        }}
      >
        {syncStatus ? syncStatusStyle[syncStatus].text : ”📊 スプレッドシートに保存”}
      </button>
      <div style={{fontSize:10,color:”var(--text3)”,textAlign:”center”,marginTop:5}}>
        Googleスプレッドシートにデータをバックアップ
      </div>
    </div>
  </div>
</div>
```

);
}
