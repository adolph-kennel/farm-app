import React, { useState } from 'react';
import { 
  Dog, Egg, Calendar, Users, Plus, Edit2, ChevronRight, 
  Trash2, ShieldAlert, Heart, Activity, ShoppingBag, 
  Baby, HelpCircle, ArrowLeft, Layers, TrendingUp
} from 'lucide-react';

// ==========================================
// 初期データ構造
// ==========================================

const INITIAL_DOGS = [
  {
    id: "dog_1",
    name: "ハク",
    breed: "シベリアンハスキー",
    gender: "♂",
    birthDate: "2021-05-10",
    color: "シルバー＆ホワイト",
    sireId: "ext_sire_1",
    damId: "ext_dam_1",
    microchip: "392148000000001",
    pedigreeNo: "SH-2021-001",
    image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=400",
    notes: "性格は穏やか。骨量が豊富。"
  },
  {
    id: "dog_2",
    name: "ルナ",
    breed: "シベリアンハスキー",
    gender: "♀",
    birthDate: "2022-02-14",
    color: "ブラック＆ホワイト",
    sireId: "ext_sire_2",
    damId: "ext_dam_2",
    microchip: "392148000000002",
    pedigreeNo: "SH-2022-045",
    image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&q=80&w=400",
    notes: "ヒート周期は約7ヶ月。"
  },
  {
    id: "dog_3",
    name: "モモ",
    breed: "ウェルシュ・コーギー",
    gender: "♀",
    birthDate: "2020-11-03",
    color: "レッド＆ホワイト",
    sireId: null,
    damId: null,
    microchip: "392148000000003",
    pedigreeNo: "WC-2020-889",
    image: "https://images.unsplash.com/photo-1612536057832-2ff7ead58194?auto=format&fit=crop&q=80&w=400",
    notes: "優良血統。安産型。"
  },
  {
    id: "dog_shin",
    name: "シン",
    breed: "シベリアンハスキー",
    gender: "♂",
    birthDate: "2023-01-15",
    color: "ブラック＆ホワイト",
    sireId: null,
    damId: null,
    microchip: "392148000000004",
    pedigreeNo: "SH-2023-102",
    image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=400",
    notes: "新規追加：ハスキー♂"
  },
  {
    id: "dog_asuka",
    name: "あすか",
    breed: "ウェルシュ・コーギー",
    gender: "♀",
    birthDate: "2023-04-20",
    color: "フォーン＆ホワイト",
    sireId: null,
    damId: null,
    microchip: "392148000000005",
    pedigreeNo: "WC-2023-304",
    image: "https://images.unsplash.com/photo-1612536057832-2ff7ead58194?auto=format&fit=crop&q=80&w=400",
    notes: "新規追加：コーギー♀"
  }
];

const INITIAL_EXTERNAL_DOGS = [
  { id: "ext_sire_1", name: "ゼウス (外部)", breed: "シベリアンハスキー", gender: "♂", pedigreeNo: "SH-EXT-001" },
  { id: "ext_dam_1", name: "ステラ (外部)", breed: "シベリアンハスキー", gender: "♀", pedigreeNo: "SH-EXT-002" },
  { id: "ext_sire_2", name: "バルカン (外部)", breed: "シベリアンハスキー", gender: "♂", pedigreeNo: "SH-EXT-003" },
  { id: "ext_dam_2", name: "オーロラ (外部)", breed: "シベリアンハスキー", gender: "♀", pedigreeNo: "SH-EXT-004" }
];

const INITIAL_DOG_RECORDS = [
  {
    id: "rec_1",
    damId: "dog_2",
    sireId: "dog_1",
    heatDate: "2023-10-01",
    matingDate: "2023-10-13",
    expectedBirthDate: "2023-12-15",
    actualBirthDate: "2023-12-14",
    status: "delivered", // heat, mated, pregnant, delivered
    puppiesCount: 4,
    notes: "自然分娩。母子ともに健康。"
  }
];

const INITIAL_PUPPIES = [
  { id: "pup_1", recordId: "rec_1", collarColor: "ブルー", gender: "♂", weight: "450g", status: "reserved", customerName: "山田太郎様", price: 280000, notes: "活発な性格" },
  { id: "pup_2", recordId: "rec_1", collarColor: "レッド", gender: "♀", weight: "420g", status: "sold", customerName: "佐藤花子様", price: 300000, notes: "おっとり" },
  { id: "pup_3", recordId: "rec_1", collarColor: "グリーン", gender: "♂", weight: "480g", status: "available", customerName: "", price: 260000, notes: "骨太" },
  { id: "pup_4", recordId: "rec_1", collarColor: "ピンク", gender: "♀", weight: "410g", status: "keep", customerName: "残し", price: 0, notes: "将来の台牝候補" }
];

// 鶏データ
const INITIAL_CHICKEN_FLOCKS = [
  {
    id: "flock_ukokkei",
    breed: "烏骨鶏",
    totalCount: 22,
    roosters: { total: 6, black: 2, white: 2, spotted: 2 },
    hens: { total: 16, black: 6, white: 3, spotted: 7 },
    notes: "成鳥データ更新済み"
  },
  {
    id: "flock_ouhan",
    breed: "岡崎おうはん",
    totalCount: 3,
    roosters: { total: 1, black: 0, white: 0, spotted: 0 },
    hens: { total: 2, black: 0, white: 0, spotted: 0 },
    notes: "成鳥データ更新済み"
  }
];

const INITIAL_EGG_RECORDS = [
  { id: "egg_1", date: "2026-03-01", breed: "烏骨鶏", count: 12, target: "販売用" },
  { id: "egg_2", date: "2026-03-01", breed: "岡崎おうはん", count: 2, target: "自家消費" },
  { id: "egg_3", date: "2026-03-02", breed: "烏骨鶏", count: 14, target: "孵化用" }
];

const INITIAL_HATCHINGS = [
  {
    id: "hatch_2026_1",
    year: 2026,
    startDate: "2026-02-01",
    hatchDate: "2026-02-22",
    breed: "烏骨鶏",
    eggCount: 10,
    hatchedCount: 7,
    status: "完了",
    notes: "2026年度 ヒナ孵化"
  },
  {
    id: "hatch_2026_2",
    year: 2026,
    startDate: "2026-02-05",
    hatchDate: "2026-02-26",
    breed: "岡崎おうはん",
    eggCount: 4,
    hatchedCount: 2,
    status: "完了",
    notes: "2026年度 ヒナ孵化"
  }
];

const INITIAL_CHICKEN_SALES = [
  { id: "cs_1", date: "2026-02-15", customerName: "鈴木農園様", item: "烏骨鶏（有精卵）", quantity: 20, amount: 6000, status: "完了" }
];

// ==========================================
// メインコンポーネント
// ==========================================

export default function BreedingManagementApp() {
  const [activeModule, setActiveModule] = useState('dog'); // 'dog' | 'chicken'

  // Dog State
  const [dogs, setDogs] = useState(INITIAL_DOGS);
  const [externalDogs] = useState(INITIAL_EXTERNAL_DOGS);
  const [dogRecords, setDogRecords] = useState(INITIAL_DOG_RECORDS);
  const [puppies, setPuppies] = useState(INITIAL_PUPPIES);
  const [selectedDogId, setSelectedDogId] = useState(null);
  const [dogTab, setDogTab] = useState('list'); // 'list' | 'timeline' | 'pedigree'

  // Chicken State
  const [flocks, setFlocks] = useState(INITIAL_CHICKEN_FLOCKS);
  const [eggRecords, setEggRecords] = useState(INITIAL_EGG_RECORDS);
  const [hatchings, setHatchings] = useState(INITIAL_HATCHINGS);
  const [chickenSales, setChickenSales] = useState(INITIAL_CHICKEN_SALES);
  const [chickenTab, setChickenTab] = useState('flock'); // 'flock' | 'eggs' | 'hatch' | 'sales'

  // Modals
  const [showAddDogModal, setShowAddDogModal] = useState(false);
  const [showAddRecordModal, setShowAddRecordModal] = useState(false);
  const [selectedPuppy, setSelectedPuppy] = useState(null);

  // --- Helper Functions ---
  const getDogById = (id) => {
    return dogs.find(d => d.id === id) || externalDogs.find(d => d.id === id) || null;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      {/* トップヘッダー / モジュール切替 */}
      <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold tracking-tight">ブリーディング総合管理 Pro</h1>
            </div>

            {/* モジュールセレクター */}
            <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
              <button
                onClick={() => setActiveModule('dog')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  activeModule === 'dog' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Dog className="w-4 h-4" />
                犬舎管理
              </button>
              <button
                onClick={() => setActiveModule('chicken')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  activeModule === 'chicken' 
                    ? 'bg-amber-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Egg className="w-4 h-4" />
                養鶏管理
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツエリア */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeModule === 'dog' ? (
          /* ==========================================
             犬舎管理モジュール
             ========================================== */
          <div className="space-y-6">
            {/* 犬舎サブナビゲーション */}
            <div className="flex justify-between items-center bg-white p-3 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex gap-2">
                <button
                  onClick={() => { setDogTab('list'); setSelectedDogId(null); }}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    dogTab === 'list' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  個体一覧
                </button>
                <button
                  onClick={() => setDogTab('timeline')}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    dogTab === 'timeline' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  繁殖タイムライン / 子犬
                </button>
              </div>
              <button 
                onClick={() => setShowAddDogModal(true)}
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" /> 個体追加
              </button>
            </div>

            {/* 犬一覧 / 詳細表示 */}
            {dogTab === 'list' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 犬カード一覧 */}
                <div className="lg:col-span-1 space-y-4">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Dog className="w-5 h-5 text-indigo-600" />
                    飼育犬一覧 ({dogs.length}頭)
                  </h2>
                  <div className="space-y-3">
                    {dogs.map(dog => (
                      <div 
                        key={dog.id}
                        onClick={() => setSelectedDogId(dog.id)}
                        className={`p-4 rounded-2xl border bg-white cursor-pointer transition-all hover:shadow-md ${
                          selectedDogId === dog.id ? 'border-indigo-600 ring-2 ring-indigo-100' : 'border-slate-200'
                        }`}
                      >
                        <div className="flex gap-4 items-center">
                          <img src={dog.image} alt={dog.name} className="w-16 h-16 rounded-xl object-cover" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                dog.gender === '♂' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                              }`}>
                                {dog.gender}
                              </span>
                              <h3 className="font-bold text-slate-900 text-lg">{dog.name}</h3>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{dog.breed}</p>
                            <p className="text-xs text-slate-400">毛色: {dog.color}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 犬詳細 & 血統図プレビュー */}
                <div className="lg:col-span-2">
                  {selectedDogId ? (
                    (() => {
                      const dog = getDogById(selectedDogId);
                      const sire = getDogById(dog.sireId);
                      const dam = getDogById(dog.damId);
                      return (
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
                          <div className="flex gap-6 items-start">
                            <img src={dog.image} alt={dog.name} className="w-28 h-28 rounded-2xl object-cover shadow-sm" />
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                    dog.gender === '♂' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                                  }`}>
                                    {dog.gender} {dog.breed}
                                  </span>
                                  <h2 className="text-2xl font-bold text-slate-900 mt-2">{dog.name}</h2>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4 mt-4 text-xs text-slate-600">
                                <div><span className="text-slate-400">生年月日:</span> {dog.birthDate || '未登録'}</div>
                                <div><span className="text-slate-400">毛色:</span> {dog.color || '未登録'}</div>
                                <div><span className="text-slate-400">マイクロチップ:</span> {dog.microchip || '未登録'}</div>
                                <div><span className="text-slate-400">血統書番号:</span> {dog.pedigreeNo || '未登録'}</div>
                              </div>
                            </div>
                          </div>

                          {/* 簡易3世代血統表示 */}
                          <div className="border-t border-slate-100 pt-6">
                            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                              <Layers className="w-4 h-4 text-indigo-600" /> 3世代家系図
                            </h3>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-3 gap-2 text-xs">
                              <div className="flex items-center font-bold text-indigo-900 bg-white p-3 rounded-lg shadow-sm border border-slate-200">
                                {dog.name} (本人)
                              </div>
                              <div className="space-y-2">
                                <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg">
                                  <p className="text-slate-400 text-[10px]">父 (Sire)</p>
                                  <p className="font-semibold text-blue-900">{sire ? sire.name : '不明/未登録'}</p>
                                </div>
                                <div className="p-2 bg-pink-50 border border-pink-200 rounded-lg">
                                  <p className="text-slate-400 text-[10px]">母 (Dam)</p>
                                  <p className="font-semibold text-pink-900">{dam ? dam.name : '不明/未登録'}</p>
                                </div>
                              </div>
                              <div className="space-y-1 text-[11px]">
                                <div className="p-1.5 bg-white border border-slate-200 rounded text-slate-600">父父: {sire && getDogById(sire.sireId) ? getDogById(sire.sireId).name : '外部/不明'}</div>
                                <div className="p-1.5 bg-white border border-slate-200 rounded text-slate-600">父母: {sire && getDogById(sire.damId) ? getDogById(sire.damId).name : '外部/不明'}</div>
                                <div className="p-1.5 bg-white border border-slate-200 rounded text-slate-600">母父: {dam && getDogById(dam.sireId) ? getDogById(dam.sireId).name : '外部/不明'}</div>
                                <div className="p-1.5 bg-white border border-slate-200 rounded text-slate-600">母母: {dam && getDogById(dam.damId) ? getDogById(dam.damId).name : '外部/不明'}</div>
                              </div>
                            </div>
                          </div>

                          {dog.notes && (
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600">
                              <span className="font-bold text-slate-700">メモ: </span>{dog.notes}
                            </div>
                          )}
                        </div>
                      );
                    })()
                  ) : (
                    <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center text-slate-400">
                      <Dog className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      左側のリストから犬を選択すると、詳細と家系図が表示されます。
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* タイムライン / 子犬管理 */}
            {dogTab === 'timeline' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-500" /> ヒート・交配・出産タイムライン
                  </h2>
                  <div className="space-y-4">
                    {dogRecords.map(rec => {
                      const dam = getDogById(rec.damId);
                      const sire = getDogById(rec.sireId);
                      const recPuppies = puppies.filter(p => p.recordId === rec.id);

                      return (
                        <div key={rec.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                          <div className="flex justify-between items-start border-b border-slate-200 pb-3 mb-3">
                            <div>
                              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                                出産完了
                              </span>
                              <h3 className="font-bold text-slate-900 text-base mt-1">
                                母: {dam?.name} × 父: {sire?.name}
                              </h3>
                            </div>
                            <div className="text-right text-xs text-slate-500">
                              <p>交配日: {rec.matingDate}</p>
                              <p className="font-bold text-slate-700">出産日: {rec.actualBirthDate}</p>
                            </div>
                          </div>

                          {/* 子犬グリッド */}
                          <div>
                            <h4 className="text-xs font-bold text-slate-600 mb-2 flex items-center gap-1">
                              <Baby className="w-4 h-4 text-indigo-600" /> 産まれた子犬 ({recPuppies.length}頭)
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                              {recPuppies.map(pup => (
                                <div 
                                  key={pup.id} 
                                  onClick={() => setSelectedPuppy(pup)}
                                  className="bg-white p-3 rounded-xl border border-slate-200 hover:border-indigo-400 cursor-pointer transition-all shadow-sm"
                                >
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-bold text-slate-700">{pup.collarColor}リボン</span>
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                      pup.gender === '♂' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                                    }`}>
                                      {pup.gender}
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-500">体重: {pup.weight}</p>
                                  <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between items-center">
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                      pup.status === 'available' ? 'bg-emerald-100 text-emerald-700' :
                                      pup.status === 'reserved' ? 'bg-amber-100 text-amber-700' :
                                      pup.status === 'sold' ? 'bg-slate-100 text-slate-600' : 'bg-purple-100 text-purple-700'
                                    }`}>
                                      {pup.status === 'available' ? 'オーナー募集' :
                                       pup.status === 'reserved' ? '商談中' :
                                       pup.status === 'sold' ? '成約済' : '残し'}
                                    </span>
                                    <span className="text-xs font-bold text-slate-800">
                                      {pup.price ? `¥${pup.price.toLocaleString()}` : '-'}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ==========================================
             養鶏管理モジュール
             ========================================== */
          <div className="space-y-6">
            {/* 養鶏サブナビゲーション */}
            <div className="flex justify-between items-center bg-white p-3 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex gap-2">
                <button
                  onClick={() => setChickenTab('flock')}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    chickenTab === 'flock' ? 'bg-amber-50 text-amber-700' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  群れ・羽数管理
                </button>
                <button
                  onClick={() => setChickenTab('eggs')}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    chickenTab === 'eggs' ? 'bg-amber-50 text-amber-700' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  産卵記録
                </button>
                <button
                  onClick={() => setChickenTab('hatch')}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    chickenTab === 'hatch' ? 'bg-amber-50 text-amber-700' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  孵化管理 (2026)
                </button>
              </div>
            </div>

            {/* 群れ・羽数管理 */}
            {chickenTab === 'flock' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {flocks.map(flock => (
                  <div key={flock.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <h3 className="text-xl font-bold text-slate-900">{flock.breed}</h3>
                      <span className="text-2xl font-black text-amber-600">{flock.totalCount} <span className="text-xs font-normal text-slate-500">羽</span></span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* ♂ 雄 */}
                      <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-blue-900 text-sm">♂ 雄 (オス)</span>
                          <span className="text-lg font-bold text-blue-700">{flock.roosters.total}羽</span>
                        </div>
                        {flock.roosters.black !== undefined && (
                          <div className="space-y-1 text-xs text-slate-600">
                            <div className="flex justify-between"><span>黒:</span> <span>{flock.roosters.black}羽</span></div>
                            <div className="flex justify-between"><span>白:</span> <span>{flock.roosters.white}羽</span></div>
                            <div className="flex justify-between"><span>マダラ:</span> <span>{flock.roosters.spotted}羽</span></div>
                          </div>
                        )}
                      </div>

                      {/* ♀ 牝 */}
                      <div className="bg-pink-50/50 p-4 rounded-xl border border-pink-100">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-pink-900 text-sm">♀ 牝 (メス)</span>
                          <span className="text-lg font-bold text-pink-700">{flock.hens.total}羽</span>
                        </div>
                        {flock.hens.black !== undefined && (
                          <div className="space-y-1 text-xs text-slate-600">
                            <div className="flex justify-between"><span>黒:</span> <span>{flock.hens.black}羽</span></div>
                            <div className="flex justify-between"><span>白:</span> <span>{flock.hens.white}羽</span></div>
                            <div className="flex justify-between"><span>マダラ:</span> <span>{flock.hens.spotted}羽</span></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 産卵記録 */}
            {chickenTab === 'eggs' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                  <Egg className="w-5 h-5 text-amber-500" /> 日別産卵記録
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">日付</th>
                        <th className="p-3">品種</th>
                        <th className="p-3">採卵数</th>
                        <th className="p-3">用途</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {eggRecords.map(rec => (
                        <tr key={rec.id}>
                          <td className="p-3 font-medium">{rec.date}</td>
                          <td className="p-3">{rec.breed}</td>
                          <td className="p-3 font-bold text-amber-600">{rec.count} 個</td>
                          <td className="p-3">
                            <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-md">
                              {rec.target}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 孵化管理 (2026年度) */}
            {chickenTab === 'hatch' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                    <Baby className="w-5 h-5 text-amber-500" /> 2026年度 ヒナ孵化実績 🐣
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hatching2026List(hatchings).map(h => (
                    <div key={h.id} className="border border-amber-200 bg-amber-50/30 p-4 rounded-xl flex justify-between items-center">
                      <div>
                        <span className="text-xs bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded">
                          {h.year}年度
                        </span>
                        <h4 className="text-lg font-bold text-slate-900 mt-1">{h.breed}</h4>
                        <p className="text-xs text-slate-500 mt-1">孵化日: {h.hatchDate}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-black text-amber-600">{h.hatchedCount}</span>
                        <span className="text-xs font-bold text-slate-600 block">羽 孵化成功 🐣</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// ヘルパー関数: 2026年データのフィルタリング
function hatching2026List(hatchings) {
  return hatchings.filter(h => h.year === 2026);
}
