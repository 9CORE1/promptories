function normalizeModelName(modelName) {
  if (!modelName) return "";
  const lower = modelName.toLowerCase().trim();
  if (lower.includes("gpt") || lower.includes("openai") || lower.includes("chatgpt")) {
    return "GPT";
  }
  if (lower.includes("gemini")) {
    return "Gemini";
  }
  if (lower.includes("claude")) {
    return "Claude";
  }
  return modelName;
}

const DEFAULT_PROMPTS = [
  {
    id: "default-email-translation",
    title: "영한 비즈니스 이메일 번역기",
    category: "번역",
    tags: ["번역", "비즈니스", "영어"],
    promptText: "당신은 글로벌 IT 기업의 전문 번역가입니다. 다음 한국어 이메일 내용을 수신자({{수신자_관계}})에 알맞은 정중하고 자연스러운 비즈니스 영어 이메일로 번역해주세요.\n전문적인 톤앤매너를 유지하고, 비즈니스 이메일 표준 서식(인사말, 본문, 맺음말)을 갖추어 주세요.\n\n[이메일 본문]\n{{이메일_본문}}\n\n[추가 요청사항]\n{{추가_요청사항}}",
    outputText: "Subject: Inquiry Regarding the Partnership Proposal\n\nDear Mr. Smith,\n\nI hope this email finds you well.\nMy name is Min-su Kim, Project Manager of the Global Business Team at ABC Corp.\n\nI am writing to discuss the partnership proposal we received last week. We are very interested in collaborating on the upcoming integration project and would like to schedule a brief meeting next week to align on the next steps.\n\nPlease let us know your availability.\n\nSincerely,\nMin-su Kim\nProject Manager",
    description: "수신자와의 관계(예: 클라이언트, 협력업체, 사내동료)에 최적화하여 격식 있는 비즈니스 영어 이메일로 번역합니다.",
    recommendedModel: "GPT",
    usageCount: 12,
    createdAt: "2026-06-24T00:00:00.000Z",
    updatedAt: "2026-06-24T00:00:00.000Z"
  },
  {
    id: "default-code-refactor",
    title: "클린 코드 리팩토링 및 최적화",
    category: "개발",
    tags: ["개발", "코딩", "리팩토링", "CleanCode"],
    promptText: "다음 {{언어}} 코드를 가독성이 높고 효율적이며 Clean Code 원칙에 부합하도록 리팩토링해주세요.\n리팩토링 시 아래의 중점 개선 요구사항을 반영해주세요:\n\n1. 시간 및 공간 복잡도 최적화\n2. 모호한 변수명 및 함수명 가독성 개선\n3. 적절한 에러 핸들링 및 경계값 처리 추가\n4. 핵심 개선 내용에 대한 짧은 주석 및 설명 요약 제공\n\n[대상 코드]\n{{코드}}",
    outputText: "// [Refactored Javascript Example]\nasync function fetchUserData(userId) {\n  if (!userId) {\n    throw new Error(\"User ID is required to fetch data.\");\n  }\n  \n  try {\n    const response = await fetch(`/api/users/${userId}`);\n    if (!response.ok) {\n      throw new Error(`HTTP error! status: ${response.status}`);\n    }\n    \n    const userData = await response.json();\n    return userData;\n  } catch (error) {\n    console.error(`[Error] Failed to fetch data for user ${userId}:`, error);\n    return null; // Return gracefully or handle upstream\n  }\n}",
    description: "구현된 코드의 시간 복잡도와 클린 코드 관점에서의 가독성을 종합 개선해 줍니다.",
    recommendedModel: "Claude",
    usageCount: 8,
    createdAt: "2026-06-24T00:10:00.000Z",
    updatedAt: "2026-06-24T00:10:00.000Z"
  },
  {
    id: "default-blog-writer",
    title: "블로그 포스팅 원고 생성기",
    category: "마케팅",
    tags: ["블로그", "글쓰기", "마케팅", "SEO"],
    promptText: "{{주제}}에 대한 매력적이고 정보가 알찬 블로그 포스팅 원고를 작성해주세요.\n주요 타겟층은 {{타겟_독자}}입니다.\n\n원고 작성 가이드라인:\n- 호기심을 이끌어내는 인트로 및 눈길을 끄는 소제목 3개 이상 구성\n- 독자에게 친근하게 다가가는 친절하고 부드러운 구어체 사용 (~해요, ~합니다)\n- 검색 최적화(SEO)를 고려하여 주요 키워드가 문맥 속에 자연스럽게 스며들도록 작성\n- 마지막 문단에 요약 정리 및 댓글 소통을 유도하는 질문 기입",
    outputText: "[제목] 코딩 입문자를 위한 필수 개발 도구 3가지 추천\n\n안녕하세요! 개발의 세계에 첫 발을 내딛으신 여러분, 환영합니다. \n처음 프로그래밍을 배울 때 어떤 도구부터 설치해야 할지 막막하셨죠? \n오늘인 입문자분들의 학습 속도를 2배로 올려줄 필수 개발 프로그램 3가지를 정리해 드립니다.\n...\n여러분은 이 중 어떤 프로그램을 주로 사용하시나요? 댓글로 함께 이야기를 나누어 보아요!",
    description: "소비자의 클릭을 유도하는 매력적인 블로그 마케팅 문안을 SEO 친화적으로 빌드합니다.",
    recommendedModel: "GPT",
    usageCount: 15,
    createdAt: "2026-06-24T00:20:00.000Z",
    updatedAt: "2026-06-24T00:20:00.000Z"
  },
  {
    id: "default-text-summarizer",
    title: "3단 구조 핵심 요약기",
    category: "생산성",
    tags: ["요약", "정리", "생산성"],
    promptText: "제시되는 긴 문장이나 문서를 직관적이고 빠르게 이해할 수 있도록 요약해주세요.\n결과는 반드시 다음 3단계 서식에 맞게 아웃풋을 고정해주시기 바랍니다:\n\n1. [3줄 요약]: 전체 텍스트에서 가장 중요한 핵심 내용 3문장으로 간추림.\n2. [상세 요약]: 주요 쟁점이나 포인트를 요점 기호(•)를 써서 구체적으로 5개 이하로 나열.\n3. [시사점 및 액션플랜]: 우리가 눈여겨보아야 할 주요 인사이트 혹은 행동 요령 1-2가지 작성.\n\n[대상 텍스트]\n{{대상_텍스트}}",
    outputText: "1. [3줄 요약]\n- 전 세계 리모트 워크 비율이 급속도로 늘고 있으나 협업 공백에 대한 우려도 증대되고 있음.\n- 기업들은 하이브리드 워크 모델을 통해 직원의 생산성과 대면 소통의 강점을 절충하는 추세임.\n- 이 성공 요인은 명확한 KPI와 자율성을 존중하는 팀 문화 구축에 있음.\n\n2. [상세 요약]\n• 직원의 70%가 하이브리드 워크가 일과 삶의 균형을 극대화한다고 답변.\n• 물리적 사무실은 소통과 소속감 형성을 위한 공동 공간으로 재정의되고 있음...\n\n3. [시사점]\n- 리더십 그룹은 문서화(Documentation) 프로세스를 투명하게 안착시키는 것이 중요함.",
    description: "뉴기사, 논문 초록, 회사 회의록 등 장문의 텍스트를 구조화된 3단계로 명료하게 요약합니다.",
    recommendedModel: "Gemini",
    usageCount: 5,
    createdAt: "2026-06-24T00:30:00.000Z",
    updatedAt: "2026-06-24T00:30:00.000Z"
  },
  {
    id: "default-interview-simulator",
    title: "AI 모의 면접관 (꼬리질문 & 피드백)",
    category: "커리어",
    tags: ["면접", "취업", "면접대비"],
    promptText: "당신은 {{지원_회사}}의 {{지원_직무}} 직무 채용을 담당하는 10년 차 테크니컬 면접관입니다.\n아래 제시된 저의 프로젝트 경험담 혹은 자기소개 답변을 분석해주세요.\n\n그 다음 냉철하고 구체적인 모의 면접을 제공해주세요:\n1. 답변에 대해 논리적으로 허점이 있거나 의문이 생기는 핵심 꼬리질문 3개 제시\n2. 제 답변에서 좋았던 부분과 피드백 (두괄식 구성, 구체적 정량 지표 제시 관점) 작성\n\n[자기소개 및 나의 경험담]\n{{경험담}}",
    outputText: "[면접관 피드백]\n프로젝트 당시 프론트엔드 최적화를 담당했다는 기술적 경험은 매력적입니다. 그러나 구체적인 렌더링 성능 지표(예: LCP 단축률 등)가 빠져 있어 기여도가 모호해 보일 수 있습니다.\n\n[핵심 꼬리 질문]\n1. 렌더링 성능을 개선하기 위해 어떤 Profiling 도구를 사용하셨으며 가장 유의미한 리소스 낭비 포인트는 무엇이었습니까?\n2. 이미지 지연 로딩 외에 번들 크기 축소(Bundle size reduction)를 위해 시도하신 기법이 있습니까?",
    description: "목표 기업 및 포지션 맞춤으로 냉철한 꼬리 질문과 이력서 스피치 교정 피드백을 제공합니다.",
    recommendedModel: "Claude",
    usageCount: 3,
    createdAt: "2026-06-24T00:40:00.000Z",
    updatedAt: "2026-06-24T00:40:00.000Z"
  }
];

// ==========================================================================
// APP STATE MANAGEMENT
// ==========================================================================
const ALLOWED_ADMIN_EMAIL = "teacha99@gmail.com"; // 본인의 실제 관리자 이메일 주소로 교체하세요.

let state = {
  prompts: [],
  currentFilter: "all",           // 'all', 'recent'
  currentCategoryFilter: null,   // string category name or null
  currentTagFilter: null,        // string tag name or null
  currentSort: "newest",         // 'newest', 'oldest', 'most-used', 'alphabetical'
  searchQuery: "",
  activePromptId: null,
  recentPromptIds: [],
  promptsPage: 1,
  isAdmin: false,                 // 관리자 모드 인증 여부
  warehouseItems: [],
  warehouseLoaded: false,
  warehousePage: 1,
  videoWarehouseItems: [],
  videoWarehouseLoaded: false,
  videoWarehousePage: 1,
  lmWarehouseItems: [],
  lmWarehouseLoaded: false,
  lmWarehousePage: 1,
  favShareItems: [],
  favShareLoaded: false
};

// ==========================================================================
// INITIALIZATION & DOM SELECTION
// ==========================================================================
document.addEventListener("DOMContentLoaded", async () => {
  await initData();
  setupEventListeners();
  renderApp();
  handleDeepLink();
  
  // Lucide Icons initialization
  lucide.createIcons();
});

// Load data from localStorage or initialize with sample data
// Load data from localStorage or initialize with sample data
// Load data from localStorage or initialize with sample data
// Load data from localStorage or initialize with sample data
async function initData() {
  const localPrompts = localStorage.getItem("prompt_manager_data");
  const localRecents = localStorage.getItem("prompt_manager_recents");
  const adminSession = localStorage.getItem("prompt_manager_admin_session");
  
  if (adminSession) {
    try {
      const session = JSON.parse(adminSession);
      // 1 hour validation check
      if (Date.now() < session.expiresAt) {
        state.isAdmin = true;
      } else {
        localStorage.removeItem("prompt_manager_admin_session");
      }
    } catch (e) {
      // Ignore parsing errors
    }
  }
  
  // 1. 로컬 캐시 우선 동기 로딩 (빠른 화면 전환 목적)
  if (localPrompts) {
    try {
      state.prompts = JSON.parse(localPrompts);
      state.prompts.forEach(p => {
        p.recommendedModel = normalizeModelName(p.recommendedModel);
      });
    } catch (err) {
      state.prompts = [...DEFAULT_PROMPTS];
      state.prompts.forEach(p => {
        p.recommendedModel = normalizeModelName(p.recommendedModel);
      });
    }
  } else {
    state.prompts = [...DEFAULT_PROMPTS];
    state.prompts.forEach(p => {
      p.recommendedModel = normalizeModelName(p.recommendedModel);
    });
  }
  
  if (localRecents) {
    try {
      state.recentPromptIds = JSON.parse(localRecents);
    } catch (e) {
      state.recentPromptIds = [];
    }
  }
  
  const localWarehouse = localStorage.getItem("prompt_manager_warehouse_data");
  if (localWarehouse) {
    try {
      state.warehouseItems = JSON.parse(localWarehouse);
      state.warehouseLoaded = true;
    } catch (e) {
      state.warehouseItems = [];
      state.warehouseLoaded = false;
    }
  }
  
  const localLMWarehouse = localStorage.getItem("prompt_manager_lm_warehouse_data");
  if (localLMWarehouse) {
    try {
      state.lmWarehouseItems = JSON.parse(localLMWarehouse);
      state.lmWarehouseLoaded = true;
    } catch (e) {
      state.lmWarehouseItems = [];
      state.lmWarehouseLoaded = false;
    }
  }

  const localVideoWarehouse = localStorage.getItem("prompt_manager_video_warehouse_data");
  if (localVideoWarehouse) {
    try {
      state.videoWarehouseItems = JSON.parse(localVideoWarehouse);
      state.videoWarehouseLoaded = true;
    } catch (e) {
      state.videoWarehouseItems = [];
      state.videoWarehouseLoaded = false;
    }
  }

  const localFavShare = localStorage.getItem("prompt_manager_fav_share_data");
  if (localFavShare) {
    try {
      state.favShareItems = JSON.parse(localFavShare);
      state.favShareLoaded = true;
    } catch (e) {
      state.favShareItems = [];
      state.favShareLoaded = false;
    }
  }
  
  // 2. 비동기로 서버 최신 JSON 파일 데이터를 가져와서 자동 덮어쓰기 (SWR 패턴)
  syncFromServer(true);
}

let lastSyncTime = 0;

// 서버 JSON 파일로부터 최신 데이터 비동기 동기화 (기기 간 실시간 갱신용)
async function syncFromServer(force = false) {
  // 관리자 모드인 경우 서버 데이터로 로컬 데이터를 덮어쓰지 않음 (로컬 편집 내용 보호)
  if (state.isAdmin) return;

  // 5초 쓰로틀링 (단, 초기 실행 등 force = true 시 생략)
  if (!force && (Date.now() - lastSyncTime < 5000)) return;
  lastSyncTime = Date.now();
  
  let updated = false;
  
  // prompts_data.json 동기화
  try {
    const response = await fetch("prompts_data.json?t=" + Date.now());
    if (response.ok) {
      const serverPrompts = await response.json();
      serverPrompts.forEach(p => {
        p.recommendedModel = normalizeModelName(p.recommendedModel);
      });
      if (JSON.stringify(state.prompts) !== JSON.stringify(serverPrompts)) {
        state.prompts = serverPrompts;
        saveData();
        updated = true;
      }
    }
  } catch (e) {
    console.warn("prompts_data.json 자동 갱신 실패", e);
  }
  
  // warehouse_data.json 동기화
  try {
    const response = await fetch("warehouse_data.json?t=" + Date.now());
    if (response.ok) {
      const data = await response.json();
      const serverItems = Array.isArray(data) ? data : (data.value || []);
      if (JSON.stringify(state.warehouseItems) !== JSON.stringify(serverItems)) {
        state.warehouseItems = serverItems;
        state.warehouseLoaded = true;
        saveWarehouseData();
        updated = true;
      }
    }
  } catch (e) {
    console.warn("warehouse_data.json 자동 갱신 실패", e);
  }
  
  // lm_warehouse_data.json 동기화
  try {
    const response = await fetch("lm_warehouse_data.json?t=" + Date.now());
    if (response.ok) {
      const data = await response.json();
      const serverItems = Array.isArray(data) ? data : (data.value || []);
      if (JSON.stringify(state.lmWarehouseItems) !== JSON.stringify(serverItems)) {
        state.lmWarehouseItems = serverItems;
        state.lmWarehouseLoaded = true;
        saveLMWarehouseData();
        updated = true;
      }
    }
  } catch (e) {
    console.warn("lm_warehouse_data.json 자동 갱신 실패", e);
  }

  // video_warehouse_data.json 동기화
  try {
    const response = await fetch("video_warehouse_data.json?t=" + Date.now());
    if (response.ok) {
      const data = await response.json();
      const serverItems = Array.isArray(data) ? data : (data.value || []);
      if (JSON.stringify(state.videoWarehouseItems) !== JSON.stringify(serverItems)) {
        state.videoWarehouseItems = serverItems;
        state.videoWarehouseLoaded = true;
        saveVideoWarehouseData();
        updated = true;
      }
    }
  } catch (e) {
    console.warn("video_warehouse_data.json 자동 갱신 실패", e);
  }
  
  // fav_share_data.json 동기화
  try {
    const response = await fetch("fav_share_data.json?t=" + Date.now());
    if (response.ok) {
      const data = await response.json();
      const serverItems = Array.isArray(data) ? data : (data.value || []);
      if (JSON.stringify(state.favShareItems) !== JSON.stringify(serverItems)) {
        state.favShareItems = serverItems;
        state.favShareLoaded = true;
        saveFavShareData();
        updated = true;
      }
    }
  } catch (e) {
    console.warn("fav_share_data.json 자동 갱신 실패", e);
  }
  
  // 변경 사항이 있을 시 화면 즉시 새로고침 및 안내 토스트 노출
  if (updated) {
    renderApp();
    if (!force) {
      showToast("서버의 최신 데이터로 동기화되었습니다.", "success", "refresh-cw");
    }
  }
}

// Ensure warehouse data is loaded from localStorage or server
async function ensureWarehouseLoaded() {
  if (state.warehouseLoaded) return;
  
  const localWarehouse = localStorage.getItem("prompt_manager_warehouse_data");
  const warehouseInitialized = localStorage.getItem("prompt_manager_warehouse_initialized");
  if (localWarehouse && warehouseInitialized) {
    try {
      const data = JSON.parse(localWarehouse);
      state.warehouseItems = Array.isArray(data) ? data : (data.value || []);
      state.warehouseLoaded = true;
      return;
    } catch (e) {
      console.error("로컬 창고 데이터 파싱 실패", e);
    }
  }
  
  try {
    showToast("서버에서 창고 데이터를 로드하는 중...", "info", "refresh-cw");
    const response = await fetch("warehouse_data.json?t=" + Date.now());
    if (response.ok) {
      const data = await response.json();
      state.warehouseItems = Array.isArray(data) ? data : (data.value || []);
      try {
        saveWarehouseData();
        localStorage.setItem("prompt_manager_warehouse_initialized", "true");
      } catch (storageError) {
        console.warn("로컬 스토리지 저장 실패 (용량 초과 가능성). 데이터는 메모리에서 유지됩니다.", storageError);
      }
      showToast("창고 데이터를 성공적으로 로드했습니다.", "success", "check");
    } else {
      state.warehouseItems = [];
    }
  } catch (e) {
    console.warn("warehouse_data.json 로드 실패. 빈 배열로 시작합니다.", e);
    state.warehouseItems = [];
  }
  state.warehouseLoaded = true;
}

async function ensureLMWarehouseLoaded() {
  if (state.lmWarehouseLoaded) return;
  
  const localLMWarehouse = localStorage.getItem("prompt_manager_lm_warehouse_data");
  const lmWarehouseInitialized = localStorage.getItem("prompt_manager_lm_warehouse_initialized");
  if (localLMWarehouse && lmWarehouseInitialized) {
    try {
      const data = JSON.parse(localLMWarehouse);
      state.lmWarehouseItems = Array.isArray(data) ? data : (data.value || []);
      state.lmWarehouseLoaded = true;
      return;
    } catch (e) {
      console.error("로컬 LM스타일 창고 데이터 파싱 실패", e);
    }
  }
  
  try {
    showToast("서버에서 LM스타일 창고 데이터를 로드하는 중...", "info", "refresh-cw");
    const response = await fetch("lm_warehouse_data.json?t=" + Date.now());
    if (response.ok) {
      const data = await response.json();
      state.lmWarehouseItems = Array.isArray(data) ? data : (data.value || []);
      try {
        saveLMWarehouseData();
        localStorage.setItem("prompt_manager_lm_warehouse_initialized", "true");
      } catch (storageError) {
        console.warn("로컬 스토리지 저장 실패 (용량 초과 가능성). 데이터는 메모리에서 유지됩니다.", storageError);
      }
      showToast("LM스타일 창고 데이터를 성공적으로 로드했습니다.", "success", "check");
    } else {
      state.lmWarehouseItems = [];
    }
  } catch (e) {
    console.warn("lm_warehouse_data.json 로드 실패. 빈 배열로 시작합니다.", e);
    state.lmWarehouseItems = [];
  }
  state.lmWarehouseLoaded = true;
}

async function ensureVideoWarehouseLoaded() {
  if (state.videoWarehouseLoaded) return;
  
  const localVideoWarehouse = localStorage.getItem("prompt_manager_video_warehouse_data");
  const videoWarehouseInitialized = localStorage.getItem("prompt_manager_video_warehouse_initialized");
  if (localVideoWarehouse && videoWarehouseInitialized) {
    try {
      const data = JSON.parse(localVideoWarehouse);
      state.videoWarehouseItems = Array.isArray(data) ? data : (data.value || []);
      state.videoWarehouseLoaded = true;
      return;
    } catch (e) {
      console.error("로컬 영상 창고 데이터 파싱 실패", e);
    }
  }
  
  try {
    showToast("서버에서 영상 창고 데이터를 로드하는 중...", "info", "refresh-cw");
    const response = await fetch("video_warehouse_data.json?t=" + Date.now());
    if (response.ok) {
      const data = await response.json();
      state.videoWarehouseItems = Array.isArray(data) ? data : (data.value || []);
      try {
        saveVideoWarehouseData();
        localStorage.setItem("prompt_manager_video_warehouse_initialized", "true");
      } catch (storageError) {
        console.warn("로컬 스토리지 저장 실패 (용량 초과 가능성). 데이터는 메모리에서 유지됩니다.", storageError);
      }
      showToast("영상 창고 데이터를 성공적으로 로드했습니다.", "success", "check");
    } else {
      state.videoWarehouseItems = [];
    }
  } catch (e) {
    console.warn("video_warehouse_data.json 로드 실패. 빈 배열로 시작합니다.", e);
    state.videoWarehouseItems = [];
  }
  state.videoWarehouseLoaded = true;
}

function saveVideoWarehouseData() {
  try {
    localStorage.setItem("prompt_manager_video_warehouse_data", JSON.stringify(state.videoWarehouseItems));
    localStorage.setItem("prompt_manager_video_warehouse_initialized", "true");
  } catch (e) {
    console.warn("로컬 스토리지 저장 실패 (용량 초과 가능성):", e);
  }
}

// Save current prompts state to localStorage
function saveData() {
  try {
    if (state.prompts && Array.isArray(state.prompts)) {
      state.prompts.forEach(p => {
        p.recommendedModel = normalizeModelName(p.recommendedModel);
      });
    }
    localStorage.setItem("prompt_manager_data", JSON.stringify(state.prompts));
  } catch (e) {
    console.warn("로컬 스토리지 저장 실패 (용량 초과 가능성):", e);
  }
}

function saveWarehouseData() {
  try {
    localStorage.setItem("prompt_manager_warehouse_data", JSON.stringify(state.warehouseItems));
    localStorage.setItem("prompt_manager_warehouse_initialized", "true");
  } catch (e) {
    console.warn("로컬 스토리지 저장 실패 (용량 초과 가능성):", e);
  }
}

function saveLMWarehouseData() {
  try {
    localStorage.setItem("prompt_manager_lm_warehouse_data", JSON.stringify(state.lmWarehouseItems));
    localStorage.setItem("prompt_manager_lm_warehouse_initialized", "true");
  } catch (e) {
    console.warn("로컬 스토리지 저장 실패 (용량 초과 가능성):", e);
  }
}

function saveRecents() {
  localStorage.setItem("prompt_manager_recents", JSON.stringify(state.recentPromptIds));
}

// Add to recent prompts tracker
function addToRecents(id) {
  state.recentPromptIds = state.recentPromptIds.filter(x => x !== id);
  state.recentPromptIds.unshift(id);
  // Keep only the last 12 items
  if (state.recentPromptIds.length > 12) {
    state.recentPromptIds.pop();
  }
  saveRecents();
  
  // If active filter is recent, re-render prompt grid
  if (state.currentFilter === "recent") {
    renderPromptGrid();
  }
}

// Helper to generate unique ID
function generateId() {
  return "prompt-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}

// ==========================================================================
// RENDER ENGINE
// ==========================================================================
function renderApp() {
  if (state.currentFilter === "warehouse") {
    document.getElementById("prompts-main-view").classList.add("hidden");
    document.getElementById("warehouse-main-view").classList.remove("hidden");
    document.getElementById("video-warehouse-main-view").classList.add("hidden");
    document.getElementById("lm-warehouse-main-view").classList.add("hidden");
    document.getElementById("fav-share-main-view").classList.add("hidden");
    renderWarehouseGrid();
  } else if (state.currentFilter === "video-warehouse") {
    document.getElementById("prompts-main-view").classList.add("hidden");
    document.getElementById("warehouse-main-view").classList.add("hidden");
    document.getElementById("video-warehouse-main-view").classList.remove("hidden");
    document.getElementById("lm-warehouse-main-view").classList.add("hidden");
    document.getElementById("fav-share-main-view").classList.add("hidden");
    renderVideoWarehouseGrid();
  } else if (state.currentFilter === "lm-warehouse") {
    document.getElementById("prompts-main-view").classList.add("hidden");
    document.getElementById("warehouse-main-view").classList.add("hidden");
    document.getElementById("video-warehouse-main-view").classList.add("hidden");
    document.getElementById("lm-warehouse-main-view").classList.remove("hidden");
    document.getElementById("fav-share-main-view").classList.add("hidden");
    renderLMWarehouseGrid();
  } else if (state.currentFilter === "fav-share") {
    document.getElementById("prompts-main-view").classList.add("hidden");
    document.getElementById("warehouse-main-view").classList.add("hidden");
    document.getElementById("video-warehouse-main-view").classList.add("hidden");
    document.getElementById("lm-warehouse-main-view").classList.add("hidden");
    document.getElementById("fav-share-main-view").classList.remove("hidden");
    renderSidebar();
    renderFavShareGrid();
  } else {
    document.getElementById("prompts-main-view").classList.remove("hidden");
    document.getElementById("warehouse-main-view").classList.add("hidden");
    document.getElementById("video-warehouse-main-view").classList.add("hidden");
    document.getElementById("lm-warehouse-main-view").classList.add("hidden");
    document.getElementById("fav-share-main-view").classList.add("hidden");
    
    renderSidebar();
    renderPromptGrid();
    updateCounters();
    updateFilterIndicator();
  }
  renderAdminUI();
}

function updateCounters() {
  document.getElementById("count-all").textContent = state.prompts.length;
}

// Update filter chips at the top header
function updateFilterIndicator() {
  const indicator = document.getElementById("filter-indicator");
  const filterName = document.getElementById("filter-name");
  
  if (state.currentCategoryFilter) {
    indicator.style.display = "flex";
    filterName.textContent = `카테고리: ${state.currentCategoryFilter}`;
  } else if (state.currentTagFilter) {
    indicator.style.display = "flex";
    filterName.textContent = `태그: #${state.currentTagFilter}`;
  } else {
    indicator.style.display = "none";
  }
}

// Renders category list and tags list in sidebar
function renderSidebar() {
  const categoriesList = document.getElementById("categories-list");
  const tagsList = document.getElementById("tags-list");
  
  // Calculate category counts
  const categoryCounts = {};
  state.prompts.forEach(p => {
    if (p.category) {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    }
  });
  
  // Render Categories
  categoriesList.innerHTML = "";
  Object.keys(categoryCounts).sort().forEach(cat => {
    const li = document.createElement("li");
    li.className = `nav-item ${state.currentCategoryFilter === cat ? "active" : ""}`;
    li.innerHTML = `
      <a href="#" class="nav-link">
        <i data-lucide="folder-open"></i>
        <span>${cat}</span>
        <span class="badge">${categoryCounts[cat]}</span>
      </a>
    `;
    li.addEventListener("click", (e) => {
      e.preventDefault();
      selectCategoryFilter(cat);
    });
    categoriesList.appendChild(li);
  });
  
  // Calculate tag counts
  const tagCounts = {};
  state.prompts.forEach(p => {
    if (p.tags && Array.isArray(p.tags)) {
      p.tags.forEach(tag => {
        if (tag.trim()) {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        }
      });
    }
  });
  
  // Render Tags (sorted by count desc)
  tagsList.innerHTML = "";
  Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15) // Top 15 tags
    .forEach(([tag, count]) => {
      const chip = document.createElement("span");
      chip.className = `tag-chip ${state.currentTagFilter === tag ? "active" : ""}`;
      chip.innerHTML = `<span>#${tag}</span><span class="tag-count">${count}</span>`;
      chip.addEventListener("click", () => {
        selectTagFilter(tag);
      });
      tagsList.appendChild(chip);
    });
    
}

// Helper to return class name based on AI model brand
function getModelClass(modelName) {
  if (!modelName) return "";
  const lower = modelName.toLowerCase();
  if (lower.includes("gpt")) return "model-gpt";
  if (lower.includes("gemini")) return "model-gemini";
  if (lower.includes("claude")) return "model-claude";
  return "";
}

// Helper to return SVG markup based on AI model brand
function getModelIconHtml(modelName) {
  if (!modelName) return "";
  const lowerName = modelName.toLowerCase();
  
  if (lowerName.includes("gpt") || lowerName.includes("openai") || lowerName.includes("chatgpt")) {
    return `<svg class="model-logo" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="none" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle; color: #10a37f; fill: currentColor; margin-right: 4px;">
      <path d="M474.123 209.81c11.525-34.577 7.569-72.423-10.838-103.904-27.696-48.168-83.433-72.94-137.794-61.414a127.14 127.14 0 00-95.475-42.49c-55.564 0-104.936 35.781-122.139 88.593-35.781 7.397-66.574 29.76-84.637 61.414-27.868 48.167-21.503 108.72 15.826 150.007-11.525 34.578-7.569 72.424 10.838 103.733 27.696 48.34 83.433 73.111 137.966 61.585 24.084 27.18 58.833 42.835 95.303 42.663 55.564 0 104.936-35.782 122.139-88.594 35.782-7.397 66.574-29.76 84.465-61.413 28.04-48.168 21.676-108.722-15.654-150.008v-.172zm-39.567-87.218c11.01 19.267 15.139 41.803 11.354 63.65-.688-.516-2.064-1.204-2.924-1.72l-101.152-58.49a16.965 16.965 0 00-16.687 0L206.621 194.5v-50.232l97.883-56.597c45.587-26.32 103.732-10.666 130.052 34.921zm-227.935 104.42l49.888-28.9 49.887 28.9v57.63l-49.887 28.9-49.888-28.9v-57.63zm23.223-191.81c22.364 0 43.867 7.742 61.07 22.02-.688.344-2.064 1.204-3.097 1.72L186.666 117.26c-5.161 2.925-8.258 8.43-8.258 14.45v136.934l-43.523-25.116V130.333c0-52.64 42.491-95.13 95.131-95.302l-.172.172zM52.14 168.697c11.182-19.268 28.557-34.062 49.544-41.803V247.14c0 6.02 3.097 11.354 8.258 14.45l118.354 68.295-43.695 25.288-97.711-56.425c-45.415-26.32-61.07-84.465-34.75-130.052zm26.665 220.71c-11.182-19.095-15.139-41.802-11.354-63.65.688.516 2.064 1.204 2.924 1.72l101.152 58.49a16.965 16.965 0 0016.687 0l118.354-68.467v50.232l-97.883 56.425c-45.587 26.148-103.732 10.665-130.052-34.75h.172zm204.54 87.39c-22.192 0-43.867-7.741-60.898-22.02a62.439 62.439 0 003.097-1.72l101.152-58.317c5.16-2.924 8.429-8.43 8.257-14.45V243.527l43.523 25.116v113.022c0 52.64-42.663 95.303-95.131 95.303v-.172zM461.22 343.303c-11.182 19.267-28.729 34.061-49.544 41.63V264.687c0-6.021-3.097-11.526-8.257-14.45L284.893 181.77l43.523-25.116 97.883 56.424c45.587 26.32 61.07 84.466 34.75 130.053l.172.172z" fill="currentColor" fill-rule="nonzero"/>
    </svg>`;
  }
  if (lowerName.includes("gemini")) {
    return `<svg class="model-logo" viewBox="0 0 65 65" xmlns="http://www.w3.org/2000/svg" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle; margin-right: 4px;">
      <defs>
        <linearGradient id="gemini-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4893fc" />
          <stop offset="50%" stop-color="#969dff" />
          <stop offset="100%" stop-color="#bd99fe" />
        </linearGradient>
      </defs>
      <path d="M32.447 0c.68 0 1.273.465 1.439 1.125a38.904 38.904 0 001.999 5.905c2.152 5 5.105 9.376 8.854 13.125 3.751 3.75 8.126 6.703 13.125 8.855a38.98 38.98 0 005.906 1.999c.66.166 1.124.758 1.124 1.438 0 .68-.464 1.273-1.125 1.439a38.902 38.902 0 00-5.905 1.999c-5 2.152-9.375 5.105-13.125 8.854-3.749 3.751-6.702 8.126-8.854 13.125a38.973 38.973 0 00-2 5.906 1.485 1.485 0 01-1.438 1.124c-.68 0-1.272-.464-1.438-1.125a38.913 38.913 0 00-2-5.905c-2.151-5-5.103-9.375-8.854-13.125-3.75-3.749-8.125-6.702-13.125-8.854a38.973 38.973 0 00-5.905-2A1.485 1.485 0 010 32.448c0-.68.465-1.272 1.125-1.438a38.903 38.903 0 005.905-2c5-2.151 9.376-5.104 13.125-8.854 3.75-3.749 6.703-8.125 8.855-13.125a38.972 38.972 0 001.999-5.905A1.485 1.485 0 0132.447 0z" fill="url(#gemini-logo-grad)"/>
    </svg>`;
  }
  if (lowerName.includes("claude")) {
    return `<svg class="model-logo" viewBox="0 0 512 509.64" xmlns="http://www.w3.org/2000/svg" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle; margin-right: 4px;">
      <path fill="#D77655" d="M115.612 0h280.775C459.974 0 512 52.026 512 115.612v278.415c0 63.587-52.026 115.612-115.613 115.612H115.612C52.026 509.639 0 457.614 0 394.027V115.612C0 52.026 52.026 0 115.612 0z"/>
      <path fill="#FCF2EE" fill-rule="nonzero" d="M142.27 316.619l73.655-41.326 1.238-3.589-1.238-1.996-3.589-.001-12.31-.759-42.084-1.138-36.498-1.516-35.361-1.896-8.897-1.895-8.34-10.995.859-5.484 7.482-5.03 10.717.935 23.683 1.617 35.537 2.452 25.782 1.517 38.193 3.968h6.064l.86-2.451-2.073-1.517-1.618-1.517-36.776-24.922-39.81-26.338-20.852-15.166-11.273-7.683-5.687-7.204-2.451-15.721 10.237-11.273 13.75.935 3.513.936 13.928 10.716 29.749 23.027 38.848 28.612 5.687 4.727 2.275-1.617.278-1.138-2.553-4.271-21.13-38.193-22.546-38.848-10.035-16.101-2.654-9.655c-.935-3.968-1.617-7.304-1.617-11.374l11.652-15.823 6.445-2.073 15.545 2.073 6.547 5.687 9.655 22.092 15.646 34.78 24.265 47.291 7.103 14.028 3.791 12.992 1.416 3.968 2.449-.001v-2.275l1.997-26.641 3.69-32.707 3.589-42.084 1.239-11.854 5.863-14.206 11.652-7.683 9.099 4.348 7.482 10.716-1.036 6.926-4.449 28.915-8.72 45.294-5.687 30.331h3.313l3.792-3.791 15.342-20.372 25.782-32.227 11.374-12.789 13.27-14.129 8.517-6.724 16.1-.001 11.854 17.617-5.307 18.199-16.581 21.029-13.75 17.819-19.716 26.54-12.309 21.231 1.138 1.694 2.932-.278 44.536-9.479 24.062-4.347 28.714-4.928 12.992 6.066 1.416 6.167-5.106 12.613-30.71 7.583-36.018 7.204-53.636 12.689-.657.48.758.935 24.164 2.275 10.337.556h25.301l47.114 3.514 12.309 8.139 7.381 9.959-1.238 7.583-18.957 9.655-25.579-6.066-59.702-14.205-20.474-5.106-2.83-.001v1.694l17.061 16.682 31.266 28.233 39.152 36.397 1.997 8.999-5.03 7.102-5.307-.758-34.401-25.883-13.27-11.651-30.053-25.302-1.996-.001v2.654l6.926 10.136 36.574 54.975 1.895 16.859-2.653 5.485-9.479 3.311-10.414-1.895-21.408-30.054-22.092-33.844-17.819-30.331-2.173 1.238-10.515 113.261-4.929 5.788-11.374 4.348-9.478-7.204-5.03-11.652 5.03-23.027 6.066-30.052 4.928-23.886 4.449-29.674 2.654-9.858-.177-.657-2.173.278-22.37 30.71-34.021 45.977-26.919 28.815-6.445 2.553-11.173-5.789 1.037-10.337 6.243-9.2 37.257-47.392 22.47-29.371 14.508-16.961-.101-2.451h-.859l-98.954 64.251-17.618 2.275-7.583-7.103.936-11.652 3.589-3.791 29.749-20.474-.101.102.024.101z"/></svg>`;
  }
  
  // Generic / Other AI models: return standard cpu icon
  return `<i data-lucide="cpu" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 4px;"></i>`;
}

// Renders the central grid of cards
function renderPromptGrid() {
  const grid = document.getElementById("prompt-grid");
  const emptyState = document.getElementById("empty-state");
  
  // Filter prompts
  let filtered = [...state.prompts];
  
  // 1. Quick Filters
  if (state.currentFilter === "recent") {
    filtered = state.recentPromptIds
      .map(id => filtered.find(p => p.id === id))
      .filter(p => p !== undefined);
  }
  
  // 2. Category Filter
  if (state.currentCategoryFilter) {
    filtered = filtered.filter(p => p.category === state.currentCategoryFilter);
  }
  
  // 3. Tag Filter
  if (state.currentTagFilter) {
    filtered = filtered.filter(p => p.tags && p.tags.includes(state.currentTagFilter));
  }
  
  // 4. Text Search
  if (state.searchQuery.trim()) {
    const query = state.searchQuery.toLowerCase().trim();
    filtered = filtered.filter(p => {
      return (
        p.title.toLowerCase().includes(query) ||
        (p.category && p.category.toLowerCase().includes(query)) ||
        p.promptText.toLowerCase().includes(query) ||
        (p.outputText && p.outputText.toLowerCase().includes(query)) ||
        (p.description && p.description.toLowerCase().includes(query)) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(query)))
      );
    });
  }
  
  // 5. Sorting (Recent filter overrides default sorting since it is based on recency order)
  if (state.currentFilter !== "recent") {
    filtered.sort((a, b) => {
      if (state.currentSort === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (state.currentSort === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (state.currentSort === "most-used") {
        return (b.usageCount || 0) - (a.usageCount || 0);
      } else if (state.currentSort === "alphabetical") {
        return a.title.localeCompare(b.title, "ko");
      }
      return 0;
    });
  }
  
  // Toggle empty state
  if (filtered.length === 0) {
    grid.innerHTML = "";
    emptyState.style.display = "flex";
    document.getElementById("prompt-pagination").innerHTML = "";
    return;
  }
  
  emptyState.style.display = "none";
  grid.innerHTML = "";
  
  // Slicing for pagination
  const cols = getGridColumnCount(grid);
  const pageSize = cols * 3; // 3 rows
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  if (state.promptsPage > totalPages) {
    state.promptsPage = Math.max(1, totalPages);
  }
  const startIndex = (state.promptsPage - 1) * pageSize;
  const paginated = filtered.slice(startIndex, startIndex + pageSize);
  
  paginated.forEach(p => {
    const card = document.createElement("div");
    card.className = "prompt-card";
    card.setAttribute("data-id", p.id);
    
    // Tag string template
    const tagsHtml = (p.tags || []).map(t => `<span class="card-tag-badge">#${t}</span>`).join("");
    
    card.innerHTML = `
      <div class="card-header">
        <div class="card-meta-left">
          <span class="card-category">${p.category || "기타"}</span>
          ${p.recommendedModel ? `<span class="card-model-badge ${getModelClass(p.recommendedModel)}">${getModelIconHtml(p.recommendedModel)}<span>${escapeHtml(p.recommendedModel)}</span></span>` : ""}
        </div>
      </div>
      <div class="card-body">
        <h3 class="card-title">${escapeHtml(p.title)}</h3>
        <div class="card-prompt-preview">${escapeHtml(p.promptText)}</div>
      </div>
      <div class="card-footer">
        <div class="card-tags">
          ${tagsHtml}
        </div>
        <div class="card-actions">
          <span class="card-stats" title="복사 사용 횟수">
            <i data-lucide="copy"></i> ${p.usageCount || 0}
          </span>
          <button class="card-copy-btn" title="프롬프트 즉시 복사">
            <i data-lucide="copy"></i>
          </button>
        </div>
      </div>
    `;
    
    // Card item event listeners
    // Click on card body/header to view details
    card.addEventListener("click", (e) => {
      // Don't open detail if copy or star buttons are clicked
      if (e.target.closest(".card-copy-btn") || e.target.closest(".card-star-btn")) {
        return;
      }
      openDetailDrawer(p.id);
    });
    
    // Star toggle button removed
    
    // Quick copy button
    card.querySelector(".card-copy-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      quickCopyPrompt(p.id);
    });
    
    grid.appendChild(card);
  });
  
  renderPagination("prompt-pagination", totalItems, state.promptsPage, pageSize, (newPage) => {
    state.promptsPage = newPage;
    renderPromptGrid();
    document.getElementById("prompt-grid").scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  
  lucide.createIcons();
}

// ==========================================================================
// CORE ACTIONS & INTERACTION logic
// ==========================================================================

// Filter switching
function selectQuickFilter(filterType) {
  state.currentFilter = filterType;
  state.currentCategoryFilter = null;
  state.currentTagFilter = null;
  
  // Reset pages to 1 on menu selection
  state.promptsPage = 1;
  if (filterType === "warehouse") {
    state.warehousePage = 1;
  } else if (filterType === "video-warehouse") {
    state.videoWarehousePage = 1;
  } else if (filterType === "lm-warehouse") {
    state.lmWarehousePage = 1;
  }
  
  // Highlight in sidebar UI
  document.querySelectorAll(".nav-menu > li").forEach(li => {
    li.classList.remove("active");
  });
  
  if (filterType === "warehouse") {
    const navWh = document.getElementById("nav-warehouse");
    if (navWh) navWh.classList.add("active");
  } else if (filterType === "video-warehouse") {
    const navVidWh = document.getElementById("nav-video-warehouse");
    if (navVidWh) navVidWh.classList.add("active");
  } else if (filterType === "lm-warehouse") {
    const navLmWh = document.getElementById("nav-lm-warehouse");
    if (navLmWh) navLmWh.classList.add("active");
  } else {
    const activeLi = document.querySelector(`.nav-menu > li[data-filter="${filterType}"]`);
    if (activeLi) activeLi.classList.add("active");
  }
  
  renderApp();
}

function selectCategoryFilter(category) {
  state.promptsPage = 1;
  // If clicked again, toggle it off
  if (state.currentCategoryFilter === category) {
    state.currentCategoryFilter = null;
  } else {
    state.currentCategoryFilter = category;
    state.currentTagFilter = null; // Exclusive filter for tag vs category
    state.currentFilter = "all";   // Reset quick links to main grid
    
    // Deactivate sidebar quick links
    document.querySelectorAll(".nav-menu > li").forEach(li => li.classList.remove("active"));
  }
  
  renderApp();
}

function selectTagFilter(tag) {
  state.promptsPage = 1;
  if (state.currentTagFilter === tag) {
    state.currentTagFilter = null;
  } else {
    state.currentTagFilter = tag;
    state.currentCategoryFilter = null;
    state.currentFilter = "all";
    
    document.querySelectorAll(".nav-menu > li").forEach(li => li.classList.remove("active"));
  }
  
  renderApp();
}

// toggleFavorite removed

// Increment prompt usage and copy template raw text
function quickCopyPrompt(id) {
  const prompt = state.prompts.find(p => p.id === id);
  if (prompt) {
    // If prompt contains placeholders, warn user to fill variables first
    const vars = detectVariables(prompt.promptText);
    if (vars.length > 0) {
      showToast("이 프롬프트에는 변수가 포함되어 있습니다. 상세 정보에서 내용을 작성 후 복사해보세요!", "warning", "info");
      openDetailDrawer(id);
      return;
    }
    
    navigator.clipboard.writeText(prompt.promptText).then(() => {
      prompt.usageCount = (prompt.usageCount || 0) + 1;
      saveData();
      addToRecents(id);
      renderPromptGrid();
      showToast("프롬프트 템플릿이 복사되었습니다!", "success", "check");
    }).catch(err => {
      showToast("복사에 실패했습니다. 권한을 확인해주세요.", "error", "alert-circle");
    });
  }
}

// Helper to escape HTML characters
function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Regular expression to detect variables {{variable_name}}
function detectVariables(text) {
  if (!text) return [];
  const regex = /\{\{([^}]+)\}\}/g;
  const matches = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    // Trim whitespaces inside brackets
    const varName = match[1].trim();
    if (!matches.includes(varName)) {
      matches.push(varName);
    }
  }
  return matches;
}

// Replace template placeholders with input values
function renderTemplate(text, values) {
  if (!text) return "";
  return text.replace(/\{\{([^}]+)\}\}/g, (match, p1) => {
    const varName = p1.trim();
    return values[varName] !== undefined && values[varName] !== "" 
      ? values[varName] 
      : match; // Leave original placeholder if empty
  });
}

// ==========================================================================
// DETAILS DRAWER INTERACTIVE LOGIC
// ==========================================================================
function openDetailDrawer(id) {
  const isWarehouse = id.startsWith("wh-");
  const isLMWarehouse = id.startsWith("lm-wh-");
  const isVideoWarehouse = id.startsWith("vid-wh-");
  state.activePromptId = id;
  renderAdminUI();
  
  if (isWarehouse || isLMWarehouse || isVideoWarehouse) {
    const item = isLMWarehouse 
      ? state.lmWarehouseItems.find(x => x.id === id)
      : (isVideoWarehouse
          ? state.videoWarehouseItems.find(x => x.id === id)
          : state.warehouseItems.find(x => x.id === id));
    if (!item) return;
    
    document.getElementById("detail-category").textContent = isLMWarehouse ? "LM스타일 창고" : (isVideoWarehouse ? "영상 프롬프트 창고" : "프롬프트 창고");
    document.getElementById("detail-title").textContent = item.title;
    
    // Description section toggler (Show URL as clickable link)
    const descSection = document.getElementById("detail-desc-section");
    const descElement = document.getElementById("detail-desc");
    if (item.url) {
      descElement.innerHTML = `참조 링크: <a href="${item.url}" target="_blank" style="color: var(--accent-primary); font-weight: 500; text-decoration: underline; word-break: break-all;">${escapeHtml(item.url)}</a>`;
      descSection.style.display = "flex";
    } else {
      descSection.style.display = "none";
    }

    // Recommended model section toggler (hide for warehouse)
    document.getElementById("detail-model-section").style.display = "none";
    
    // Tags cloud (hide for warehouse)
    document.getElementById("detail-tags").style.display = "none";
    
    // Original prompt text section (Show Associated Prompt text)
    const originalTextElement = document.getElementById("detail-original-text");
    const promptSection = document.getElementById("detail-prompt-section");
    if (item.prompt && item.prompt.trim()) {
      originalTextElement.textContent = item.prompt;
      promptSection.style.display = "flex";
    } else {
      originalTextElement.textContent = "";
      promptSection.style.display = "none";
    }
    
    // Output example section (Show Image capture)
    const outputSection = document.getElementById("detail-output-section");
    const outputTextContainer = document.getElementById("detail-output-text-container");
    const outputImageContainer = document.getElementById("detail-output-image-container");
    const outputImage = document.getElementById("detail-output-image");
    const copyOutputBtn = document.getElementById("btn-copy-output");
    
    outputSection.style.display = "flex";
    outputTextContainer.style.display = "none";
    copyOutputBtn.style.display = "none";
    
    if (item.image) {
      outputImage.src = item.image;
      outputImageContainer.style.display = "flex";
    } else {
      outputImageContainer.style.display = "none";
      outputImage.src = "";
    }
    
    // Hide usage count container
    document.getElementById("detail-usage-container").style.display = "none";
    
    const createdDate = new Date(item.createdAt);
    document.getElementById("detail-created-at").textContent = `${createdDate.getFullYear()}-${String(createdDate.getMonth() + 1).padStart(2, '0')}-${String(createdDate.getDate()).padStart(2, '0')}`;
    
    // Show drawer UI
    document.getElementById("detail-drawer-backdrop").classList.add("active");
    document.getElementById("detail-drawer").classList.add("active");
  } else {
    const prompt = state.prompts.find(p => p.id === id);
    if (!prompt) return;
    
    // Reset standard elements display
    document.getElementById("detail-usage-container").style.display = "block";
    document.getElementById("detail-prompt-section").style.display = "flex";
    
    // Set UI elements
    document.getElementById("detail-category").textContent = prompt.category || "기타";
    document.getElementById("detail-title").textContent = prompt.title;
    document.getElementById("detail-desc").textContent = prompt.description || "등록된 설명이나 메모가 없습니다.";
    
    // Description section toggler
    const descSection = document.getElementById("detail-desc-section");
    if (!prompt.description) {
      descSection.style.display = "none";
    } else {
      descSection.style.display = "flex";
    }

    // Recommended model section toggler
    const modelSection = document.getElementById("detail-model-section");
    const modelElement = document.getElementById("detail-model");
    if (prompt.recommendedModel && prompt.recommendedModel.trim()) {
      modelElement.className = `detail-model-badge ${getModelClass(prompt.recommendedModel)}`;
      modelElement.innerHTML = `${getModelIconHtml(prompt.recommendedModel)}<span>${escapeHtml(prompt.recommendedModel)}</span>`;
      modelSection.style.display = "flex";
    } else {
      modelSection.style.display = "none";
    }
    
    // Tags cloud
    const tagsContainer = document.getElementById("detail-tags");
    tagsContainer.innerHTML = "";
    if (prompt.tags && prompt.tags.length > 0) {
      prompt.tags.forEach(tag => {
        const span = document.createElement("span");
        span.className = "drawer-tag";
        span.textContent = `#${tag}`;
        tagsContainer.appendChild(span);
      });
      tagsContainer.style.display = "flex";
    } else {
      tagsContainer.style.display = "none";
    }
    
    // Output example section
    const outputSection = document.getElementById("detail-output-section");
    const outputText = document.getElementById("detail-output-text");
    const outputTextContainer = document.getElementById("detail-output-text-container");
    const outputImageContainer = document.getElementById("detail-output-image-container");
    const outputImage = document.getElementById("detail-output-image");
    const copyOutputBtn = document.getElementById("btn-copy-output");
    
    const hasText = prompt.outputText && prompt.outputText.trim();
    const hasImage = prompt.outputImage && prompt.outputImage.trim();
    
    if (hasText || hasImage) {
      outputSection.style.display = "flex";
      
      if (hasText) {
        outputText.textContent = prompt.outputText;
        outputTextContainer.style.display = "block";
        copyOutputBtn.style.display = "inline-flex";
      } else {
        outputTextContainer.style.display = "none";
        copyOutputBtn.style.display = "none";
      }
      
      if (hasImage) {
        outputImage.src = prompt.outputImage;
        outputImageContainer.style.display = "flex";
      } else {
        outputImageContainer.style.display = "none";
        outputImage.src = "";
      }
    } else {
      outputSection.style.display = "none";
    }
    
    // Usage statistics & dates
    document.getElementById("detail-usage-count").textContent = prompt.usageCount || 0;
    
    const createdDate = new Date(prompt.createdAt);
    document.getElementById("detail-created-at").textContent = `${createdDate.getFullYear()}-${String(createdDate.getMonth() + 1).padStart(2, '0')}-${String(createdDate.getDate()).padStart(2, '0')}`;
    
    // Setup Original text preview directly (no variables form/tabs)
    document.getElementById("detail-original-text").textContent = prompt.promptText;
    
    // Show drawer UI
    document.getElementById("detail-drawer-backdrop").classList.add("active");
    document.getElementById("detail-drawer").classList.add("active");
  }
}

function closeDetailDrawer() {
  state.activePromptId = null;
  document.getElementById("detail-drawer-backdrop").classList.remove("active");
  document.getElementById("detail-drawer").classList.remove("active");
}

// updateDrawerFavoriteUI removed



// ==========================================================================
// MODAL (ADD & EDIT) IMPLEMENTATION
// ==========================================================================
function openModal(editingId = null, sharedState = null) {
  const form = document.getElementById("prompt-form");
  form.reset();
  
  // Reset custom category toggles
  document.getElementById("form-category").classList.remove("hidden");
  document.getElementById("form-category-new").classList.add("hidden");
  document.getElementById("form-category-new").required = false;
  document.getElementById("form-category").required = true;
  document.getElementById("btn-toggle-new-category").innerHTML = `<i data-lucide="plus"></i>`;
  
  // Populate category options based on existing data
  const select = document.getElementById("form-category");
  select.innerHTML = `<option value="" disabled selected>선택하세요</option>`;
  
  const categories = [...new Set(state.prompts.map(p => p.category).filter(Boolean))].sort();
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });
  
  // Reset image upload fields
  document.getElementById("form-image-data").value = "";
  document.getElementById("modal-image-preview").src = "";
  document.getElementById("modal-image-preview-container").classList.add("hidden");
  document.getElementById("upload-placeholder").classList.remove("hidden");
  
  if (editingId) {
    // EDIT MODE
    const prompt = state.prompts.find(p => p.id === editingId);
    if (!prompt) return;
    
    document.getElementById("modal-title").textContent = "프롬프트 편집";
    document.getElementById("prompt-id").value = prompt.id;
    document.getElementById("form-title").value = prompt.title;
    document.getElementById("form-category").value = prompt.category;
    document.getElementById("form-tags").value = (prompt.tags || []).join(", ");
    document.getElementById("form-desc").value = prompt.description || "";
    
    // Set recommended model fields
    const modelVal = prompt.recommendedModel || "";
    if (["GPT", "Gemini", "Claude"].includes(modelVal)) {
      document.getElementById("form-model-select").value = modelVal;
      document.getElementById("form-model-custom").style.display = "none";
      document.getElementById("form-model-custom").value = "";
    } else if (modelVal === "") {
      document.getElementById("form-model-select").value = "GPT";
      document.getElementById("form-model-custom").style.display = "none";
      document.getElementById("form-model-custom").value = "";
    } else {
      document.getElementById("form-model-select").value = "기타";
      document.getElementById("form-model-custom").style.display = "block";
      document.getElementById("form-model-custom").value = modelVal;
    }
    
    document.getElementById("form-prompt").value = prompt.promptText;
    document.getElementById("form-output").value = prompt.outputText || "";
    
    // Fill image data if exists
    if (prompt.outputImage) {
      document.getElementById("form-image-data").value = prompt.outputImage;
      document.getElementById("modal-image-preview").src = prompt.outputImage;
      document.getElementById("modal-image-preview-container").classList.remove("hidden");
      document.getElementById("upload-placeholder").classList.add("hidden");
    }
    
    // Close detail drawer if editing from it
    closeDetailDrawer();
  } else if (sharedState) {
    // SHARED STATE MODE
    document.getElementById("modal-title").textContent = "공유받은 프롬프트 추가";
    document.getElementById("prompt-id").value = "";
    document.getElementById("form-title").value = sharedState.title || "";
    
    const hasCategory = categories.includes(sharedState.category);
    if (hasCategory) {
      document.getElementById("form-category").value = sharedState.category;
    } else if (sharedState.category) {
      toggleNewCategoryInput();
      document.getElementById("form-category-new").value = sharedState.category;
    }
    
    document.getElementById("form-tags").value = sharedState.tags || "";
    document.getElementById("form-desc").value = sharedState.description || "";
    
    // Set recommended model fields
    const modelVal = sharedState.recommendedModel || "";
    if (["GPT", "Gemini", "Claude"].includes(modelVal)) {
      document.getElementById("form-model-select").value = modelVal;
      document.getElementById("form-model-custom").style.display = "none";
      document.getElementById("form-model-custom").value = "";
    } else if (modelVal === "") {
      document.getElementById("form-model-select").value = "GPT";
      document.getElementById("form-model-custom").style.display = "none";
      document.getElementById("form-model-custom").value = "";
    } else {
      document.getElementById("form-model-select").value = "기타";
      document.getElementById("form-model-custom").style.display = "block";
      document.getElementById("form-model-custom").value = modelVal;
    }
    
    document.getElementById("form-prompt").value = sharedState.promptText || "";
    document.getElementById("form-output").value = sharedState.outputText || "";
  } else {
    // ADD MODE
    document.getElementById("modal-title").textContent = "새 프롬프트 추가";
    document.getElementById("prompt-id").value = "";
    document.getElementById("form-model-select").value = "GPT";
    document.getElementById("form-model-custom").style.display = "none";
    document.getElementById("form-model-custom").value = "";
  }
  
  // Show copy share link button in modal always
  const modalShareBtn = document.getElementById("btn-modal-share");
  if (modalShareBtn) {
    modalShareBtn.classList.remove("hidden");
  }
  
  document.getElementById("prompt-modal").classList.add("active");
  lucide.createIcons();
}

function closeModal() {
  document.getElementById("prompt-modal").classList.remove("active");
}

function toggleNewCategoryInput() {
  const select = document.getElementById("form-category");
  const inputNew = document.getElementById("form-category-new");
  const btn = document.getElementById("btn-toggle-new-category");
  
  if (inputNew.classList.contains("hidden")) {
    select.classList.add("hidden");
    select.required = false;
    inputNew.classList.remove("hidden");
    inputNew.required = true;
    inputNew.focus();
    btn.innerHTML = `<i data-lucide="list"></i>`;
    btn.title = "목록에서 선택";
  } else {
    select.classList.remove("hidden");
    select.required = true;
    inputNew.classList.add("hidden");
    inputNew.required = false;
    btn.innerHTML = `<i data-lucide="plus"></i>`;
    btn.title = "새 카테고리 추가";
  }
  lucide.createIcons();
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const idInput = document.getElementById("prompt-id").value;
  const title = document.getElementById("form-title").value.trim();
  
  // Category determination (dropdown vs new text input)
  const selectCat = document.getElementById("form-category").value;
  const newCatInput = document.getElementById("form-category-new");
  let category = "";
  
  if (!newCatInput.classList.contains("hidden")) {
    category = newCatInput.value.trim();
  } else {
    category = selectCat;
  }
  
  if (!category) {
    showToast("카테고리를 선택하거나 직접 입력해주세요.", "error", "alert-circle");
    return;
  }
  
  // Tags parsing
  const tagsStr = document.getElementById("form-tags").value;
  const tags = tagsStr.split(",")
    .map(t => t.trim())
    .filter(t => t !== "");
    
  const description = document.getElementById("form-desc").value.trim();
  
  const modelSelect = document.getElementById("form-model-select").value;
  let recommendedModel = "";
  if (modelSelect === "기타") {
    recommendedModel = document.getElementById("form-model-custom").value.trim();
  } else {
    recommendedModel = modelSelect;
  }
  
  const promptText = document.getElementById("form-prompt").value.trim();
  const outputText = document.getElementById("form-output").value.trim();
  const outputImage = document.getElementById("form-image-data").value;
  
  if (!promptText) {
    showToast("프롬프트 본문을 입력해주세요.", "error", "alert-circle");
    return;
  }
  
  const isEditing = idInput !== "";
  
  if (isEditing) {
    // Update existing
    const idx = state.prompts.findIndex(p => p.id === idInput);
    if (idx !== -1) {
      state.prompts[idx] = {
        ...state.prompts[idx],
        title,
        category,
        tags,
        description,
        recommendedModel,
        promptText,
        outputText,
        outputImage,
        updatedAt: new Date().toISOString()
      };
      showToast("프롬프트가 수정되었습니다.", "success", "check");
    }
  } else {
    // Create new
    const newPrompt = {
      id: generateId(),
      title,
      category,
      tags,
      description,
      recommendedModel,
      promptText,
      outputText,
      outputImage,
      usageCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    state.prompts.push(newPrompt);
    state.promptsPage = 1;
    showToast("새 프롬프트가 추가되었습니다.", "success", "check");
  }
  
  saveData();
  closeModal();
  renderApp();
  
  // If we just edited, reopen the drawer to see changes
  if (isEditing) {
    setTimeout(() => {
      openDetailDrawer(idInput);
    }, 300);
  }
}

function deletePrompt(id) {
  if (confirm("정말 이 프롬프트를 삭제하시겠습니까? 복구할 수 없습니다.")) {
    state.prompts = state.prompts.filter(p => p.id !== id);
    state.recentPromptIds = state.recentPromptIds.filter(x => x !== id);
    saveData();
    saveRecents();
    closeDetailDrawer();
    renderApp();
    showToast("프롬프트가 정상적으로 삭제되었습니다.", "info", "trash-2");
  }
}

// ==========================================================================
// IMPORT & EXPORT LOGIC
// ==========================================================================
async function downloadFileFromServer(url, defaultFileName) {
  try {
    showToast("서버에서 파일을 다운로드하는 중...", "info", "refresh-cw");
    // 캐시 방지를 위해 타임스탬프 추가
    const response = await fetch(`${url}?t=${Date.now()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = defaultFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);
    showToast(`${defaultFileName} 파일을 성공적으로 다운로드했습니다.`, "success", "download");
  } catch (error) {
    console.error(`서버 파일 다운로드 실패: ${url}`, error);
    showToast("서버에서 파일을 다운로드하는데 실패했습니다.", "error", "alert-circle");
  }
}

async function exportData() {
  const { items, count, newImages } = await lightweightPromptItems(state.prompts);
  
  if (count > 0) {
    state.prompts = items;
    saveData();
    renderPromptGrid();
    
    // Download new images
    newImages.forEach(img => {
      downloadBase64Image(img.filename, img.base64);
    });
    
    showToast(`${count}개의 새로운 이미지가 경량화(다운로드)되었습니다.`, "success", "image");
  }
  
  // Download updated JSON file of local state
  downloadJsonFile("prompts_data.json", state.prompts);
}

// GitHub 이미지 파일 업로드 기능
async function uploadImageToGitHub(filePath, base64Data) {
  let config = JSON.parse(localStorage.getItem("prompt_manager_github_config"));
  if (!config || !config.token || !config.owner || !config.repo) {
    throw new Error("GitHub 설정(PAT, Owner, Repository)이 필요합니다.");
  }
  
  const { token, owner, repo, branch } = config;
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
  const commitMessage = `Upload image ${filePath} via PROMPTORIES Sync at ${new Date().toLocaleString()}`;
  
  // Extract pure Base64 content from data URL (e.g. data:image/jpeg;base64,...)
  const matches = base64Data.match(/^data:image\/([a-zA-Z+]+);base64,(.+)$/);
  if (!matches) {
    throw new Error("올바른 Base64 이미지 형식이 아닙니다.");
  }
  const contentBase64 = matches[2];

  // 1. 기존 파일의 SHA 가져오기
  let sha = null;
  const getRes = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/vnd.github+json"
    }
  });
  
  if (getRes.ok) {
    const fileInfo = await getRes.json();
    sha = fileInfo.sha;
  }
  
  // 2. PUT 요청으로 이미지 파일 업로드
  const body = {
    message: commitMessage,
    content: contentBase64,
    branch: branch || "main"
  };
  if (sha) {
    body.sha = sha;
  }
  
  const putRes = await fetch(url, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accept": "application/vnd.github+json"
    },
    body: JSON.stringify(body)
  });
  
  if (!putRes.ok) {
    const errData = await putRes.json();
    throw new Error(`이미지 업로드 실패: ${errData.message || "API 오류"}`);
  }
}

// 새로운 프롬프트 창고 항목에 대해서만 이미지 경량화 수행 (Base64 -> relative path)
async function lightweightWarehouseItems(items, isLM = false) {
  let count = 0;
  const newImages = [];
  
  for (let item of items) {
    if (item.image && item.image.startsWith("data:image/")) {
      // Find extension from data URL
      const matches = item.image.match(/^data:image\/([a-zA-Z+]+);base64,/);
      let ext = "jpeg";
      if (matches && matches[1]) {
        ext = matches[1] === "jpeg" ? "jpeg" : matches[1];
      }
      
      const filename = `${item.id}.${ext}`;
      const relativePath = `images/${filename}`;
      
      newImages.push({
        path: relativePath,
        base64: item.image,
        filename: filename
      });
      
      // Update image path in the item
      item.image = relativePath;
      count++;
    }
  }
  
  return { items, count, newImages };
}

async function lightweightPromptItems(items) {
  let count = 0;
  const newImages = [];
  
  for (let item of items) {
    if (item.outputImage && item.outputImage.startsWith("data:image/")) {
      // Find extension from data URL
      const matches = item.outputImage.match(/^data:image\/([a-zA-Z+]+);base64,/);
      let ext = "jpeg";
      if (matches && matches[1]) {
        ext = matches[1] === "jpeg" ? "jpeg" : matches[1];
      }
      
      const filename = `${item.id}.${ext}`;
      const relativePath = `images/${filename}`;
      
      newImages.push({
        path: relativePath,
        base64: item.outputImage,
        filename: filename
      });
      
      // Update image path in the item
      item.outputImage = relativePath;
      count++;
    }
  }
  
  return { items, count, newImages };
}

// 브라우저에서 Base64 이미지 파일 개별 다운로드
function downloadBase64Image(filename, base64Data) {
  const link = document.createElement("a");
  link.href = base64Data;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 브라우저에서 JSON 파일 직접 다운로드
function downloadJsonFile(filename, data) {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

async function exportWarehouseData() {
  await ensureWarehouseLoaded();
  
  const { items, count, newImages } = await lightweightWarehouseItems(state.warehouseItems, false);
  
  if (count > 0) {
    state.warehouseItems = items;
    saveWarehouseData();
    renderWarehouseGrid();
    
    // Download new images
    newImages.forEach(img => {
      downloadBase64Image(img.filename, img.base64);
    });
    
    showToast(`${count}개의 새로운 이미지가 경량화(다운로드)되었습니다.`, "success", "image");
  }
  
  // Download updated JSON file of local state
  downloadJsonFile("warehouse_data.json", state.warehouseItems);
}

async function exportLMWarehouseData() {
  await ensureLMWarehouseLoaded();
  
  const { items, count, newImages } = await lightweightWarehouseItems(state.lmWarehouseItems, true);
  
  if (count > 0) {
    state.lmWarehouseItems = items;
    saveLMWarehouseData();
    renderLMWarehouseGrid();
    
    // Download new images
    newImages.forEach(img => {
      downloadBase64Image(img.filename, img.base64);
    });
    
    showToast(`${count}개의 새로운 이미지가 경량화(다운로드)되었습니다.`, "success", "image");
  }
  
  // Download updated JSON file of local state
  downloadJsonFile("lm_warehouse_data.json", state.lmWarehouseItems);
}

async function exportVideoWarehouseData() {
  await ensureVideoWarehouseLoaded();
  
  const { items, count, newImages } = await lightweightWarehouseItems(state.videoWarehouseItems, false);
  
  if (count > 0) {
    state.videoWarehouseItems = items;
    saveVideoWarehouseData();
    renderVideoWarehouseGrid();
    
    // Download new images
    newImages.forEach(img => {
      downloadBase64Image(img.filename, img.base64);
    });
    
    showToast(`${count}개의 새로운 이미지가 경량화(다운로드)되었습니다.`, "success", "image");
  }
  
  // Download updated JSON file of local state
  downloadJsonFile("video_warehouse_data.json", state.videoWarehouseItems);
}

// GitHub 연동 모달 관련 상태
let githubConfigCallback = null;

function openGithubConfigModal(callback = null) {
  githubConfigCallback = callback;
  
  // 기존 설정값 채우기
  const config = JSON.parse(localStorage.getItem("prompt_manager_github_config") || "{}");
  document.getElementById("github-token").value = config.token || "";
  document.getElementById("github-owner").value = config.owner || "";
  document.getElementById("github-repo").value = config.repo || "";
  document.getElementById("github-branch").value = config.branch || "";
  
  // 설정 내용 삭제 버튼 제어 (기존 설정값이 있는 경우에만 표시)
  const hasConfig = config.token || config.owner || config.repo;
  const btnDelete = document.getElementById("btn-github-config-delete");
  if (btnDelete) {
    btnDelete.style.display = hasConfig ? "inline-block" : "none";
  }
  
  document.getElementById("github-config-modal").classList.add("active");
  setTimeout(() => document.getElementById("github-token").focus(), 150);
}

function closeGithubConfigModal() {
  document.getElementById("github-config-modal").classList.remove("active");
  githubConfigCallback = null;
}

function handleSaveGithubConfig(e) {
  if (e) e.preventDefault();
  
  const token = document.getElementById("github-token").value.trim();
  const owner = document.getElementById("github-owner").value.trim();
  const repo = document.getElementById("github-repo").value.trim();
  const branch = document.getElementById("github-branch").value.trim() || "main";
  
  if (!token || !owner || !repo) {
    showToast("필수 입력 필드를 채워주세요.", "error", "alert-circle");
    return;
  }
  
  const config = { token, owner, repo, branch };
  localStorage.setItem("prompt_manager_github_config", JSON.stringify(config));
  
  showToast("GitHub 동기화 설정이 저장되었습니다.", "success", "settings");
  closeGithubConfigModal();
  
  if (githubConfigCallback) {
    githubConfigCallback(config);
  }
}

// 공통 GitHub 파일 업로드 기능
async function uploadFileToGitHub(fileName, data) {
  let config = JSON.parse(localStorage.getItem("prompt_manager_github_config"));
  
  if (!config || !config.token || !config.owner || !config.repo) {
    openGithubConfigModal((newConfig) => {
      uploadFileToGitHub(fileName, data);
    });
    return;
  }
  
  const { token, owner, repo, branch } = config;
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${fileName}`;
  const commitMessage = `Update ${fileName} via PROMPTORIES Sync at ${new Date().toLocaleString()}`;
  
  // Base64 encoding supporting UTF-8
  const jsonStr = JSON.stringify(data, null, 2);
  const utf8Bytes = new TextEncoder().encode(jsonStr);
  let binary = "";
  const len = utf8Bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(utf8Bytes[i]);
  }
  const contentBase64 = btoa(binary);

  try {
    showToast("GitHub 서버와 통신 중...", "info", "refresh-cw");
    
    // 1. 기존 파일의 SHA 가져오기
    let sha = null;
    const getRes = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/vnd.github+json"
      }
    });
    
    if (getRes.ok) {
      const fileInfo = await getRes.json();
      sha = fileInfo.sha;
    } else if (getRes.status !== 404) {
      const errData = await getRes.json();
      showToast(`GitHub 서버 연결 실패: ${errData.message || "오류"}`, "error", "alert-triangle");
      return;
    }
    
    // 2. PUT 요청으로 파일 업데이트 또는 생성
    const body = {
      message: commitMessage,
      content: contentBase64,
      branch: branch || "main"
    };
    if (sha) {
      body.sha = sha;
    }
    
    const putRes = await fetch(url, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/vnd.github+json"
      },
      body: JSON.stringify(body)
    });
    
    if (putRes.ok) {
      showToast(`${fileName} 파일이 GitHub 서버에 성공적으로 동기화되었습니다!`, "success", "cloud-lightning");
    } else {
      const errData = await putRes.json();
      console.error("GitHub API PUT Error:", errData);
      showToast(`동기화 실패: ${errData.message || "GitHub API 오류"}`, "error", "alert-circle");
    }
  } catch (e) {
    console.error("GitHub API Sync Error:", e);
    showToast("서버 동기화 중 오류가 발생했습니다. 네트워크 상태를 확인하세요.", "error", "alert-triangle");
  }
}

// 동기화 트리거 함수들
async function syncWarehouseToServer() {
  await ensureWarehouseLoaded();
  let config = JSON.parse(localStorage.getItem("prompt_manager_github_config"));
  
  if (config && config.owner && config.repo) {
    if (confirm(`GitHub 저장소 (${config.owner}/${config.repo})의 ${config.branch || 'main'} 브랜치에 현재 프롬프트 창고 데이터를 저장하시겠습니까?\n\n[확인]을 누르면 저장이 진행되며, [취소]를 누르면 설정을 변경할 수 있습니다.`)) {
      
      // Perform lightweighting first!
      const { items, count, newImages } = await lightweightWarehouseItems(state.warehouseItems, false);
      
      if (count > 0) {
        state.warehouseItems = items;
        saveWarehouseData();
        renderWarehouseGrid();
        
        try {
          showToast("새로운 이미지 파일들을 GitHub에 업로드 중...", "info", "refresh-cw");
          for (let img of newImages) {
            await uploadImageToGitHub(img.path, img.base64);
          }
          showToast(`${count}개의 이미지가 GitHub에 업로드되었습니다.`, "success", "image");
        } catch (err) {
          console.error(err);
          showToast(`이미지 업로드 중 오류 발생: ${err.message}`, "error", "alert-triangle");
          return; // Stop if image upload fails
        }
      }
      
      await uploadFileToGitHub("warehouse_data.json", state.warehouseItems);
    } else {
      openGithubConfigModal(async () => {
        if (confirm("새로 저장된 설정으로 동기화를 바로 진행하시겠습니까?")) {
          // Perform lightweighting first!
          const { items, count, newImages } = await lightweightWarehouseItems(state.warehouseItems, false);
          
          if (count > 0) {
            state.warehouseItems = items;
            saveWarehouseData();
            renderWarehouseGrid();
            
            try {
              showToast("새로운 이미지 파일들을 GitHub에 업로드 중...", "info", "refresh-cw");
              for (let img of newImages) {
                await uploadImageToGitHub(img.path, img.base64);
              }
              showToast(`${count}개의 이미지가 GitHub에 업로드되었습니다.`, "success", "image");
            } catch (err) {
              console.error(err);
              showToast(`이미지 업로드 중 오류 발생: ${err.message}`, "error", "alert-triangle");
              return;
            }
          }
          await uploadFileToGitHub("warehouse_data.json", state.warehouseItems);
        }
      });
    }
  } else {
    openGithubConfigModal(async () => {
      // Perform lightweighting first!
      const { items, count, newImages } = await lightweightWarehouseItems(state.warehouseItems, false);
      
      if (count > 0) {
        state.warehouseItems = items;
        saveWarehouseData();
        renderWarehouseGrid();
        
        try {
          showToast("새로운 이미지 파일들을 GitHub에 업로드 중...", "info", "refresh-cw");
          for (let img of newImages) {
            await uploadImageToGitHub(img.path, img.base64);
          }
          showToast(`${count}개의 이미지가 GitHub에 업로드되었습니다.`, "success", "image");
        } catch (err) {
          console.error(err);
          showToast(`이미지 업로드 중 오류 발생: ${err.message}`, "error", "alert-triangle");
          return;
        }
      }
      await uploadFileToGitHub("warehouse_data.json", state.warehouseItems);
    });
  }
}

async function syncLMWarehouseToServer() {
  await ensureLMWarehouseLoaded();
  let config = JSON.parse(localStorage.getItem("prompt_manager_github_config"));
  
  if (config && config.owner && config.repo) {
    if (confirm(`GitHub 저장소 (${config.owner}/${config.repo})의 ${config.branch || 'main'} 브랜치에 현재 LM스타일 창고 데이터를 저장하시겠습니까?\n\n[확인]을 누르면 저장이 진행되며, [취소]를 누르면 설정을 변경할 수 있습니다.`)) {
      
      // Perform lightweighting first!
      const { items, count, newImages } = await lightweightWarehouseItems(state.lmWarehouseItems, true);
      
      if (count > 0) {
        state.lmWarehouseItems = items;
        saveLMWarehouseData();
        renderLMWarehouseGrid();
        
        try {
          showToast("새로운 이미지 파일들을 GitHub에 업로드 중...", "info", "refresh-cw");
          for (let img of newImages) {
            await uploadImageToGitHub(img.path, img.base64);
          }
          showToast(`${count}개의 이미지가 GitHub에 업로드되었습니다.`, "success", "image");
        } catch (err) {
          console.error(err);
          showToast(`이미지 업로드 중 오류 발생: ${err.message}`, "error", "alert-triangle");
          return; // Stop if image upload fails
        }
      }
      
      await uploadFileToGitHub("lm_warehouse_data.json", state.lmWarehouseItems);
    } else {
      openGithubConfigModal(async () => {
        if (confirm("새로 저장된 설정으로 동기화를 바로 진행하시겠습니까?")) {
          // Perform lightweighting first!
          const { items, count, newImages } = await lightweightWarehouseItems(state.lmWarehouseItems, true);
          
          if (count > 0) {
            state.lmWarehouseItems = items;
            saveLMWarehouseData();
            renderLMWarehouseGrid();
            
            try {
              showToast("새로운 이미지 파일들을 GitHub에 업로드 중...", "info", "refresh-cw");
              for (let img of newImages) {
                await uploadImageToGitHub(img.path, img.base64);
              }
              showToast(`${count}개의 이미지가 GitHub에 업로드되었습니다.`, "success", "image");
            } catch (err) {
              console.error(err);
              showToast(`이미지 업로드 중 오류 발생: ${err.message}`, "error", "alert-triangle");
              return;
            }
          }
          await uploadFileToGitHub("lm_warehouse_data.json", state.lmWarehouseItems);
        }
      });
    }
  } else {
    openGithubConfigModal(async () => {
      // Perform lightweighting first!
      const { items, count, newImages } = await lightweightWarehouseItems(state.lmWarehouseItems, true);
      
      if (count > 0) {
        state.lmWarehouseItems = items;
        saveLMWarehouseData();
        renderLMWarehouseGrid();
        
        try {
          showToast("새로운 이미지 파일들을 GitHub에 업로드 중...", "info", "refresh-cw");
          for (let img of newImages) {
            await uploadImageToGitHub(img.path, img.base64);
          }
          showToast(`${count}개의 이미지가 GitHub에 업로드되었습니다.`, "success", "image");
        } catch (err) {
          console.error(err);
          showToast(`이미지 업로드 중 오류 발생: ${err.message}`, "error", "alert-triangle");
          return;
        }
      }
      await uploadFileToGitHub("lm_warehouse_data.json", state.lmWarehouseItems);
    });
  }
}

async function syncVideoWarehouseToServer() {
  await ensureVideoWarehouseLoaded();
  let config = JSON.parse(localStorage.getItem("prompt_manager_github_config"));
  
  if (config && config.owner && config.repo) {
    if (confirm(`GitHub 저장소 (${config.owner}/${config.repo})의 ${config.branch || 'main'} 브랜치에 현재 영상 프롬프트 창고 데이터를 저장하시겠습니까?\n\n[확인]을 누르면 저장이 진행되며, [취소]를 누르면 설정을 변경할 수 있습니다.`)) {
      
      // Perform lightweighting first!
      const { items, count, newImages } = await lightweightWarehouseItems(state.videoWarehouseItems, false);
      
      if (count > 0) {
        state.videoWarehouseItems = items;
        saveVideoWarehouseData();
        renderVideoWarehouseGrid();
        
        try {
          showToast("새로운 이미지 파일들을 GitHub에 업로드 중...", "info", "refresh-cw");
          for (let img of newImages) {
            await uploadImageToGitHub(img.path, img.base64);
          }
          showToast(`${count}개의 이미지가 GitHub에 업로드되었습니다.`, "success", "image");
        } catch (err) {
          console.error(err);
          showToast(`이미지 업로드 중 오류 발생: ${err.message}`, "error", "alert-triangle");
          return; // Stop if image upload fails
        }
      }
      
      await uploadFileToGitHub("video_warehouse_data.json", state.videoWarehouseItems);
    } else {
      openGithubConfigModal(async () => {
        if (confirm("새로 저장된 설정으로 동기화를 바로 진행하시겠습니까?")) {
          // Perform lightweighting first!
          const { items, count, newImages } = await lightweightWarehouseItems(state.videoWarehouseItems, false);
          
          if (count > 0) {
            state.videoWarehouseItems = items;
            saveVideoWarehouseData();
            renderVideoWarehouseGrid();
            
            try {
              showToast("새로운 이미지 파일들을 GitHub에 업로드 중...", "info", "refresh-cw");
              for (let img of newImages) {
                await uploadImageToGitHub(img.path, img.base64);
              }
              showToast(`${count}개의 이미지가 GitHub에 업로드되었습니다.`, "success", "image");
            } catch (err) {
              console.error(err);
              showToast(`이미지 업로드 중 오류 발생: ${err.message}`, "error", "alert-triangle");
              return;
            }
          }
          await uploadFileToGitHub("video_warehouse_data.json", state.videoWarehouseItems);
        }
      });
    }
  } else {
    openGithubConfigModal(async () => {
      // Perform lightweighting first!
      const { items, count, newImages } = await lightweightWarehouseItems(state.videoWarehouseItems, false);
      
      if (count > 0) {
        state.videoWarehouseItems = items;
        saveVideoWarehouseData();
        renderVideoWarehouseGrid();
        
        try {
          showToast("새로운 이미지 파일들을 GitHub에 업로드 중...", "info", "refresh-cw");
          for (let img of newImages) {
            await uploadImageToGitHub(img.path, img.base64);
          }
          showToast(`${count}개의 이미지가 GitHub에 업로드되었습니다.`, "success", "image");
        } catch (err) {
          console.error(err);
          showToast(`이미지 업로드 중 오류 발생: ${err.message}`, "error", "alert-triangle");
          return;
        }
      }
      await uploadFileToGitHub("video_warehouse_data.json", state.videoWarehouseItems);
    });
  }
}

async function syncPromptsToServer() {
  let config = JSON.parse(localStorage.getItem("prompt_manager_github_config"));
  
  if (config && config.owner && config.repo) {
    if (confirm(`GitHub 저장소 (${config.owner}/${config.repo})의 ${config.branch || 'main'} 브랜치에 현재 전체 프롬프트 데이터를 저장하시겠습니까?\n\n[확인]을 누르면 저장이 진행되며, [취소]를 누르면 설정을 변경할 수 있습니다.`)) {
      
      // Perform lightweighting first!
      const { items, count, newImages } = await lightweightPromptItems(state.prompts);
      
      if (count > 0) {
        state.prompts = items;
        saveData();
        renderPromptGrid();
        
        try {
          showToast("새로운 이미지 파일들을 GitHub에 업로드 중...", "info", "refresh-cw");
          for (let img of newImages) {
            await uploadImageToGitHub(img.path, img.base64);
          }
          showToast(`${count}개의 이미지가 GitHub에 업로드되었습니다.`, "success", "image");
        } catch (err) {
          console.error(err);
          showToast(`이미지 업로드 중 오류 발생: ${err.message}`, "error", "alert-triangle");
          return; // Stop if image upload fails
        }
      }
      
      await uploadFileToGitHub("prompts_data.json", state.prompts);
    } else {
      openGithubConfigModal(async () => {
        if (confirm("새로 저장된 설정으로 동기화를 바로 진행하시겠습니까?")) {
          // Perform lightweighting first!
          const { items, count, newImages } = await lightweightPromptItems(state.prompts);
          
          if (count > 0) {
            state.prompts = items;
            saveData();
            renderPromptGrid();
            
            try {
              showToast("새로운 이미지 파일들을 GitHub에 업로드 중...", "info", "refresh-cw");
              for (let img of newImages) {
                await uploadImageToGitHub(img.path, img.base64);
              }
              showToast(`${count}개의 이미지가 GitHub에 업로드되었습니다.`, "success", "image");
            } catch (err) {
              console.error(err);
              showToast(`이미지 업로드 중 오류 발생: ${err.message}`, "error", "alert-triangle");
              return;
            }
          }
          await uploadFileToGitHub("prompts_data.json", state.prompts);
        }
      });
    }
  } else {
    openGithubConfigModal(async () => {
      // Perform lightweighting first!
      const { items, count, newImages } = await lightweightPromptItems(state.prompts);
      
      if (count > 0) {
        state.prompts = items;
        saveData();
        renderPromptGrid();
        
        try {
          showToast("새로운 이미지 파일들을 GitHub에 업로드 중...", "info", "refresh-cw");
          for (let img of newImages) {
            await uploadImageToGitHub(img.path, img.base64);
          }
          showToast(`${count}개의 이미지가 GitHub에 업로드되었습니다.`, "success", "image");
        } catch (err) {
          console.error(err);
          showToast(`이미지 업로드 중 오류 발생: ${err.message}`, "error", "alert-triangle");
          return;
        }
      }
      await uploadFileToGitHub("prompts_data.json", state.prompts);
    });
  }
}

async function copyWarehouseJson() {
  await ensureWarehouseLoaded();
  const dataStr = JSON.stringify(state.warehouseItems, null, 2);
  navigator.clipboard.writeText(dataStr).then(() => {
    showToast("창고 데이터(JSON)가 클립보드에 복사되었습니다! 메모장에 붙여넣고 저장하세요.", "success", "copy");
  }).catch(err => {
    console.error(err);
    showToast("복사에 실패했습니다. 권한을 확인해주세요.", "error", "alert-circle");
  });
}

async function copyLMWarehouseJson() {
  await ensureLMWarehouseLoaded();
  const dataStr = JSON.stringify(state.lmWarehouseItems, null, 2);
  navigator.clipboard.writeText(dataStr).then(() => {
    showToast("LM스타일 창고 데이터(JSON)가 클립보드에 복사되었습니다! 메모장에 붙여넣고 저장하세요.", "success", "copy");
  }).catch(err => {
    console.error(err);
    showToast("복사에 실패했습니다. 권한을 확인해주세요.", "error", "alert-circle");
  });
}

async function copyVideoWarehouseJson() {
  await ensureVideoWarehouseLoaded();
  const dataStr = JSON.stringify(state.videoWarehouseItems, null, 2);
  navigator.clipboard.writeText(dataStr).then(() => {
    showToast("영상 프롬프트 창고 데이터(JSON)가 클립보드에 복사되었습니다! 메모장에 붙여넣고 저장하세요.", "success", "copy");
  }).catch(err => {
    console.error(err);
    showToast("복사에 실패했습니다. 권한을 확인해주세요.", "error", "alert-circle");
  });
}

// ==========================================================================
// TOAST NOTIFICATIONS MANAGER
// ==========================================================================
function showToast(message, type = "success", icon = "check") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i data-lucide="${icon}"></i>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  lucide.createIcons();
  
  // Slide out after 3 seconds, remove from DOM after 3.3 seconds
  setTimeout(() => {
    toast.style.animation = "fadeOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards";
    setTimeout(() => {
      container.removeChild(toast);
    }, 300);
  }, 3000);
}

// ==========================================================================
// EVENT LISTENERS BINDING
// ==========================================================================
function setupEventListeners() {
  // Sidebar navigation quick filters
  document.querySelectorAll(".nav-menu > li[data-filter]").forEach(li => {
    li.addEventListener("click", (e) => {
      e.preventDefault();
      selectQuickFilter(li.getAttribute("data-filter"));
    });
  });
  
  // Reset filter chip click
  document.getElementById("btn-clear-filters").addEventListener("click", () => {
    state.currentCategoryFilter = null;
    state.currentTagFilter = null;
    state.promptsPage = 1;
    renderApp();
  });
  
  // Search input listeners
  const searchInput = document.getElementById("search-input");
  const searchClear = document.getElementById("search-clear");
  
  searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    state.promptsPage = 1;
    if (state.searchQuery.trim().length > 0) {
      searchClear.style.display = "block";
    } else {
      searchClear.style.display = "none";
    }
    renderPromptGrid();
  });
  
  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    state.searchQuery = "";
    state.promptsPage = 1;
    searchClear.style.display = "none";
    renderPromptGrid();
    searchInput.focus();
  });
  
  // AI Model select listener
  const formModelSelect = document.getElementById("form-model-select");
  const formModelCustom = document.getElementById("form-model-custom");
  if (formModelSelect && formModelCustom) {
    formModelSelect.addEventListener("change", (e) => {
      if (e.target.value === "기타") {
        formModelCustom.style.display = "block";
        formModelCustom.required = true;
        formModelCustom.focus();
      } else {
        formModelCustom.style.display = "none";
        formModelCustom.required = false;
        formModelCustom.value = "";
      }
    });
  }
  
  // Shortcut listener for search focus (Ctrl+K or /)
  window.addEventListener("keydown", (e) => {
    // "/" focuses search if not currently inside form inputs
    if (e.key === "/" && document.activeElement !== searchInput && 
        document.activeElement.tagName !== "INPUT" && 
        document.activeElement.tagName !== "TEXTAREA") {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
    
    // "Ctrl+K" or "Cmd+K" focuses search
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
    
    // "Esc" key closes drawer and modals
    if (e.key === "Escape") {
      if (document.getElementById("prompt-modal").classList.contains("active")) {
        closeModal();
      } else if (document.getElementById("warehouse-modal").classList.contains("active")) {
        closeWarehouseModal();
      } else if (document.getElementById("lm-warehouse-modal").classList.contains("active")) {
        closeLMWarehouseModal();
      } else if (document.getElementById("fav-share-modal").classList.contains("active")) {
        closeFavShareModal();
      } else if (document.getElementById("github-config-modal").classList.contains("active")) {
        closeGithubConfigModal();
      } else if (document.getElementById("detail-drawer").classList.contains("active")) {
        closeDetailDrawer();
      }
    }
  });
  
  // Sorting select box
  document.getElementById("sort-select").addEventListener("change", (e) => {
    state.currentSort = e.target.value;
    state.promptsPage = 1;
    renderPromptGrid();
  });
  
  // Empty state reset button
  document.getElementById("btn-reset-search").addEventListener("click", () => {
    searchInput.value = "";
    state.searchQuery = "";
    state.promptsPage = 1;
    searchClear.style.display = "none";
    state.currentCategoryFilter = null;
    state.currentTagFilter = null;
    state.currentFilter = "all";
    document.querySelectorAll(".nav-menu > li").forEach(li => {
      li.classList.remove("active");
    });
    document.querySelector('.nav-menu > li[data-filter="all"]').classList.add("active");
    renderApp();
  });
  
  // Admin Login Toggle Button
  document.getElementById("btn-admin-login-toggle").addEventListener("click", () => {
    if (state.isAdmin) {
      if (confirm("관리자 모드를 로그아웃 하시겠습니까?")) {
        state.isAdmin = false;
        localStorage.removeItem("prompt_manager_admin_session");
        renderApp();
        showToast("일반 사용자 모드로 전환되었습니다.", "info", "lock");
      }
    } else {
      openEmailAuthModal();
    }
  });



  // Email Auth Modal Events
  document.getElementById("btn-auth-close").addEventListener("click", closeEmailAuthModal);
  document.getElementById("btn-auth-cancel").addEventListener("click", closeEmailAuthModal);
  document.getElementById("btn-send-code").addEventListener("click", handleSendAuthCode);
  document.getElementById("btn-verify-code").addEventListener("click", handleVerifyAuthCode);
  document.getElementById("btn-auth-back").addEventListener("click", showEmailStep);

  document.getElementById("auth-email").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendAuthCode();
    }
  });

  document.getElementById("auth-code").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleVerifyAuthCode();
    }
  });
  
  // Modal buttons
  document.getElementById("btn-modal-close").addEventListener("click", closeModal);
  document.getElementById("btn-modal-cancel").addEventListener("click", closeModal);
  document.getElementById("prompt-modal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("prompt-modal")) {
      closeModal();
    }
  });
  
  // Category dropdown combobox toggle
  document.getElementById("btn-toggle-new-category").addEventListener("click", toggleNewCategoryInput);
  document.getElementById("btn-toggle-fav-new-category").addEventListener("click", toggleFavNewCategoryInput);
  
  // Modal Submit
  document.getElementById("prompt-form").addEventListener("submit", handleFormSubmit);
  
  // Detail Drawer Backdrop click to close
  document.getElementById("detail-drawer-backdrop").addEventListener("click", closeDetailDrawer);
  document.getElementById("btn-detail-close").addEventListener("click", closeDetailDrawer);
  
  // Detail drawer share button removed
  
  document.getElementById("btn-detail-edit").addEventListener("click", () => {
    if (state.activePromptId) {
      if (state.activePromptId.startsWith("lm-wh-")) {
        openLMWarehouseModal(state.activePromptId);
      } else if (state.activePromptId.startsWith("vid-wh-")) {
        openVideoWarehouseModal(state.activePromptId);
      } else if (state.activePromptId.startsWith("wh-")) {
        openWarehouseModal(state.activePromptId);
      } else {
        openModal(state.activePromptId);
      }
    }
  });
  
  document.getElementById("btn-detail-delete").addEventListener("click", () => {
    if (state.activePromptId) {
      if (state.activePromptId.startsWith("lm-wh-")) {
        deleteLMWarehouseItem(state.activePromptId);
      } else if (state.activePromptId.startsWith("vid-wh-")) {
        deleteVideoWarehouseItem(state.activePromptId);
      } else if (state.activePromptId.startsWith("wh-")) {
        deleteWarehouseItem(state.activePromptId);
      } else {
        deletePrompt(state.activePromptId);
      }
    }
  });
  
  // Copying from Detail Drawer
  document.getElementById("btn-copy-original").addEventListener("click", () => {
    const text = document.getElementById("detail-original-text").textContent;
    navigator.clipboard.writeText(text).then(() => {
      if (state.activePromptId) {
        const prompt = state.prompts.find(p => p.id === state.activePromptId);
        if (prompt) {
          prompt.usageCount = (prompt.usageCount || 0) + 1;
          saveData();
          addToRecents(state.activePromptId);
          renderPromptGrid();
          // Update usage count in drawer too
          document.getElementById("detail-usage-count").textContent = prompt.usageCount;
        }
      }
      showToast("프롬프트 템플릿이 복사되었습니다!", "success", "check");
    }).catch(err => {
      showToast("복사에 실패했습니다.", "error", "alert-circle");
    });
  });
  
  document.getElementById("btn-copy-output").addEventListener("click", () => {
    const text = document.getElementById("detail-output-text").textContent;
    navigator.clipboard.writeText(text).then(() => {
      showToast("결과물 예시가 복사되었습니다!", "success", "check");
    }).catch(err => {
      showToast("복사에 실패했습니다.", "error", "alert-circle");
    });
  });
  
  // Backup / Sync Actions (All Prompts Page)
  document.getElementById("btn-export-prompts-page").addEventListener("click", exportData);
  document.getElementById("btn-sync-prompts-page").addEventListener("click", syncPromptsToServer);
  document.getElementById("btn-copy-prompts-json").addEventListener("click", copyPromptsJson);
  document.getElementById("btn-new-prompt-page").addEventListener("click", () => openModal());
  
  // Link sharing copies
  document.getElementById("btn-modal-share").addEventListener("click", () => {
    const title = document.getElementById("form-title").value.trim();
    const selectCat = document.getElementById("form-category").value;
    const newCatInput = document.getElementById("form-category-new");
    let category = "";
    if (newCatInput && !newCatInput.classList.contains("hidden")) {
      category = newCatInput.value.trim();
    } else {
      category = selectCat;
    }
    const tags = document.getElementById("form-tags").value.trim();
    const description = document.getElementById("form-desc").value.trim();
    const modelSelect = document.getElementById("form-model-select").value;
    let recommendedModel = "";
    if (modelSelect === "기타") {
      recommendedModel = document.getElementById("form-model-custom").value.trim();
    } else {
      recommendedModel = modelSelect;
    }
    const promptText = document.getElementById("form-prompt").value.trim();
    const outputText = document.getElementById("form-output").value.trim();
    
    if (!title && !promptText) {
      showToast("공유할 내용을 입력해주세요. (최소 제목 또는 본문 필요)", "warning", "info");
      return;
    }
    
    const stateToShare = {
      title,
      category,
      tags,
      description,
      recommendedModel,
      promptText,
      outputText
    };
    
    const base64 = encodePromptState(stateToShare);
    const shareUrl = window.location.origin + window.location.pathname + "?shareState=" + base64;
    navigator.clipboard.writeText(shareUrl).then(() => {
      showToast("입력된 상태 전체가 포함된 공유 링크가 복사되었습니다!", "success", "share-2");
    }).catch(err => {
      showToast("링크 복사에 실패했습니다.", "error", "alert-circle");
    });
  });
  
  // Image Drag & Drop and Upload Zone
  const uploadZone = document.getElementById("image-upload-zone");
  const fileInput = document.getElementById("form-image-input");
  
  uploadZone.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) handleImageUpload(file);
  });
  
  uploadZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadZone.classList.add("dragover");
  });
  
  uploadZone.addEventListener("dragleave", () => {
    uploadZone.classList.remove("dragover");
  });
  
  uploadZone.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadZone.classList.remove("dragover");
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file);
    }
  });
  
  // Paste screenshot from clipboard (Ctrl+V) anywhere when modal is open
  window.addEventListener("paste", (e) => {
    const modal = document.getElementById("prompt-modal");
    if (!modal.classList.contains("active")) return;
    
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        handleImageUpload(file);
        break; // Only handle first image pasted
      }
    }
  });
  
  // Remove image attachment
  document.getElementById("btn-remove-image").addEventListener("click", (e) => {
    e.stopPropagation();
    document.getElementById("form-image-data").value = "";
    document.getElementById("modal-image-preview").src = "";
    document.getElementById("modal-image-preview-container").classList.add("hidden");
    document.getElementById("upload-placeholder").classList.remove("hidden");
    fileInput.value = ""; // Clear file element input
    showToast("첨부 이미지가 제거되었습니다.", "info", "x-circle");
  });
  
  // Lightbox Zoom events
  const detailOutputImage = document.getElementById("detail-output-image");
  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxImage = document.getElementById("lightbox-image");
  
  detailOutputImage.addEventListener("click", () => {
    lightboxImage.src = detailOutputImage.src;
    lightboxModal.classList.add("active");
  });
  
  document.getElementById("btn-lightbox-close").addEventListener("click", () => {
    lightboxModal.classList.remove("active");
  });
  
  lightboxModal.addEventListener("click", (e) => {
    if (e.target === lightboxModal || e.target.classList.contains("lightbox-content")) {
      lightboxModal.classList.remove("active");
    }
  });

  // Prompt Warehouse Menu Selection
  document.getElementById("nav-warehouse").addEventListener("click", async (e) => {
    e.preventDefault();
    await ensureWarehouseLoaded();
    selectQuickFilter("warehouse");
  });

  // Favorites Share Menu Selection
  document.getElementById("nav-fav-share").addEventListener("click", async (e) => {
    e.preventDefault();
    await ensureFavShareLoaded();
    selectQuickFilter("fav-share");
  });

  // Favorites Share Item Add Modal Toggle & Buttons
  document.getElementById("btn-new-fav-share-item").addEventListener("click", () => openFavShareModal());
  document.getElementById("btn-sync-fav-share").addEventListener("click", syncFavShareToServer);
  document.getElementById("btn-export-fav-share").addEventListener("click", exportFavShareData);
  document.getElementById("btn-copy-fav-share-json").addEventListener("click", copyFavShareJson);
  document.getElementById("btn-fav-share-modal-close").addEventListener("click", closeFavShareModal);
  document.getElementById("btn-fav-share-modal-cancel").addEventListener("click", closeFavShareModal);
  
  // Favorites Share Category Order Modal
  document.getElementById("btn-fav-category-order").addEventListener("click", openFavCategoryOrderModal);
  document.getElementById("btn-fav-category-order-modal-close").addEventListener("click", closeFavCategoryOrderModal);
  document.getElementById("btn-fav-category-order-modal-cancel").addEventListener("click", closeFavCategoryOrderModal);
  document.getElementById("btn-fav-category-order-modal-save").addEventListener("click", () => {
    saveFavCategoryOrder(tempCategoryOrder);
    closeFavCategoryOrderModal();
    renderFavShareGrid();
    showToast("카테고리 표시 순서가 저장되었습니다.", "success", "check");
  });
  document.getElementById("fav-share-modal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("fav-share-modal")) {
      closeFavShareModal();
    }
  });

  // Favorites Share Submit
  document.getElementById("fav-share-form").addEventListener("submit", handleFavShareFormSubmit);

  // Warehouse Item Add Modal Toggle
  document.getElementById("btn-new-warehouse-item").addEventListener("click", () => openWarehouseModal());
  document.getElementById("btn-sync-warehouse").addEventListener("click", syncWarehouseToServer);
  document.getElementById("btn-export-warehouse").addEventListener("click", exportWarehouseData);
  document.getElementById("btn-copy-warehouse-json").addEventListener("click", copyWarehouseJson);
  document.getElementById("btn-warehouse-modal-close").addEventListener("click", closeWarehouseModal);
  document.getElementById("btn-warehouse-modal-cancel").addEventListener("click", closeWarehouseModal);
  document.getElementById("warehouse-modal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("warehouse-modal")) {
      closeWarehouseModal();
    }
  });

  // Warehouse Submit
  document.getElementById("warehouse-form").addEventListener("submit", handleWarehouseFormSubmit);

  // Video Prompt Warehouse Menu Selection
  document.getElementById("nav-video-warehouse").addEventListener("click", async (e) => {
    e.preventDefault();
    await ensureVideoWarehouseLoaded();
    selectQuickFilter("video-warehouse");
  });

  // Video Warehouse Item Add Modal Toggle
  document.getElementById("btn-new-video-warehouse-item").addEventListener("click", () => openVideoWarehouseModal());
  document.getElementById("btn-sync-video-warehouse").addEventListener("click", syncVideoWarehouseToServer);
  document.getElementById("btn-export-video-warehouse").addEventListener("click", exportVideoWarehouseData);
  document.getElementById("btn-copy-video-warehouse-json").addEventListener("click", copyVideoWarehouseJson);
  document.getElementById("btn-video-warehouse-modal-close").addEventListener("click", closeVideoWarehouseModal);
  document.getElementById("btn-video-warehouse-modal-cancel").addEventListener("click", closeVideoWarehouseModal);
  document.getElementById("video-warehouse-modal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("video-warehouse-modal")) {
      closeVideoWarehouseModal();
    }
  });

  // Video Warehouse Submit
  document.getElementById("video-warehouse-form").addEventListener("submit", handleVideoWarehouseFormSubmit);

  // Warehouse Image upload zone trigger
  const whUploadZone = document.getElementById("wh-image-upload-zone");
  const whFileInput = document.getElementById("wh-image-input");

  whUploadZone.addEventListener("click", () => whFileInput.click());
  whFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) handleWarehouseImageUpload(file);
  });

  whUploadZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    whUploadZone.classList.add("dragover");
  });

  whUploadZone.addEventListener("dragleave", () => {
    whUploadZone.classList.remove("dragover");
  });

  whUploadZone.addEventListener("drop", (e) => {
    e.preventDefault();
    whUploadZone.classList.remove("dragover");
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleWarehouseImageUpload(file);
    }
  });

  // Global paste hook for warehouse modal too
  window.addEventListener("paste", (e) => {
    const whModal = document.getElementById("warehouse-modal");
    if (!whModal.classList.contains("active")) return;

    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        handleWarehouseImageUpload(file);
        break;
      }
    }
  });

  // Warehouse Remove image attachment
  document.getElementById("btn-wh-remove-image").addEventListener("click", (e) => {
    e.stopPropagation();
    document.getElementById("wh-image-data").value = "";
    document.getElementById("wh-image-preview").src = "";
    document.getElementById("wh-image-preview-container").classList.add("hidden");
    document.getElementById("wh-upload-placeholder").classList.remove("hidden");
    whFileInput.value = "";
    showToast("첨부 이미지가 제거되었습니다.", "info", "x-circle");
  });

  // Video Warehouse Image upload zone trigger
  const videoWhUploadZone = document.getElementById("video-wh-image-upload-zone");
  const videoWhFileInput = document.getElementById("video-wh-image-input");

  videoWhUploadZone.addEventListener("click", () => videoWhFileInput.click());
  videoWhFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) handleVideoWarehouseImageUpload(file);
  });

  videoWhUploadZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    videoWhUploadZone.classList.add("dragover");
  });

  videoWhUploadZone.addEventListener("dragleave", () => {
    videoWhUploadZone.classList.remove("dragover");
  });

  videoWhUploadZone.addEventListener("drop", (e) => {
    e.preventDefault();
    videoWhUploadZone.classList.remove("dragover");
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleVideoWarehouseImageUpload(file);
    }
  });

  // Global paste hook for Video warehouse modal
  window.addEventListener("paste", (e) => {
    const videoWhModal = document.getElementById("video-warehouse-modal");
    if (!videoWhModal || !videoWhModal.classList.contains("active")) return;

    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        handleVideoWarehouseImageUpload(file);
        break;
      }
    }
  });

  // Video Warehouse Remove image attachment
  document.getElementById("btn-video-wh-remove-image").addEventListener("click", (e) => {
    e.stopPropagation();
    document.getElementById("video-wh-image-data").value = "";
    document.getElementById("video-wh-image-preview").src = "";
    document.getElementById("video-wh-image-preview-container").classList.add("hidden");
    document.getElementById("video-wh-upload-placeholder").classList.remove("hidden");
    videoWhFileInput.value = "";
    showToast("첨부 이미지가 제거되었습니다.", "info", "x-circle");
  });

  // LM Style Warehouse Menu Selection
  document.getElementById("nav-lm-warehouse").addEventListener("click", async (e) => {
    e.preventDefault();
    await ensureLMWarehouseLoaded();
    selectQuickFilter("lm-warehouse");
  });

  // LM Warehouse Item Add Modal Toggle
  document.getElementById("btn-new-lm-warehouse-item").addEventListener("click", () => openLMWarehouseModal());
  document.getElementById("btn-sync-lm-warehouse").addEventListener("click", syncLMWarehouseToServer);
  document.getElementById("btn-export-lm-warehouse").addEventListener("click", exportLMWarehouseData);
  document.getElementById("btn-copy-lm-warehouse-json").addEventListener("click", copyLMWarehouseJson);
  document.getElementById("btn-lm-warehouse-modal-close").addEventListener("click", closeLMWarehouseModal);
  document.getElementById("btn-lm-warehouse-modal-cancel").addEventListener("click", closeLMWarehouseModal);
  document.getElementById("lm-warehouse-modal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("lm-warehouse-modal")) {
      closeLMWarehouseModal();
    }
  });

  // LM Warehouse Submit
  document.getElementById("lm-warehouse-form").addEventListener("submit", handleLMWarehouseFormSubmit);

  // LM Warehouse Image upload zone trigger
  const lmMwUploadZone = document.getElementById("lm-wh-image-upload-zone");
  const lmMwFileInput = document.getElementById("lm-wh-image-input");

  lmMwUploadZone.addEventListener("click", () => lmMwFileInput.click());
  lmMwFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) handleLMWarehouseImageUpload(file);
  });

  lmMwUploadZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    lmMwUploadZone.classList.add("dragover");
  });

  lmMwUploadZone.addEventListener("dragleave", () => {
    lmMwUploadZone.classList.remove("dragover");
  });

  lmMwUploadZone.addEventListener("drop", (e) => {
    e.preventDefault();
    lmMwUploadZone.classList.remove("dragover");
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleLMWarehouseImageUpload(file);
    }
  });

  // Global paste hook for LM warehouse modal
  window.addEventListener("paste", (e) => {
    const lmWhModal = document.getElementById("lm-warehouse-modal");
    if (!lmWhModal.classList.contains("active")) return;

    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        handleLMWarehouseImageUpload(file);
        break;
      }
    }
  });

  // LM Warehouse Remove image attachment
  document.getElementById("btn-lm-wh-remove-image").addEventListener("click", (e) => {
    e.stopPropagation();
    document.getElementById("lm-wh-image-data").value = "";
    document.getElementById("lm-wh-image-preview").src = "";
    document.getElementById("lm-wh-image-preview-container").classList.add("hidden");
    document.getElementById("lm-wh-upload-placeholder").classList.remove("hidden");
    lmMwFileInput.value = "";
    showToast("첨부 이미지가 제거되었습니다.", "info", "x-circle");
  });

  // GitHub Config Modal Events
  document.getElementById("btn-github-config").addEventListener("click", () => openGithubConfigModal());
  document.getElementById("btn-github-config-close").addEventListener("click", closeGithubConfigModal);
  document.getElementById("btn-github-config-cancel").addEventListener("click", closeGithubConfigModal);
  document.getElementById("github-config-form").addEventListener("submit", handleSaveGithubConfig);
  document.getElementById("github-config-modal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("github-config-modal")) {
      closeGithubConfigModal();
    }
  });
  
  // GitHub 설정 삭제 버튼 이벤트
  document.getElementById("btn-github-config-delete").addEventListener("click", () => {
    if (confirm("저장된 모든 GitHub 연동 정보(토큰, Owner, Repo 등)를 로컬 스토리지에서 삭제하시겠습니까?")) {
      localStorage.removeItem("prompt_manager_github_config");
      showToast("GitHub 연동 설정이 완전히 삭제되었습니다.", "info", "trash-2");
      closeGithubConfigModal();
    }
  });

  // 자동 데이터 동기화 이벤트 등록 (다른 기기에서 탭 포커스 / 화면 재진입 시 갱신)
  window.addEventListener("focus", () => {
    syncFromServer();
  });
  
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      syncFromServer();
    }
  });

  // Handle window resize to recalculate pagination pages
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (state.currentFilter === "warehouse") {
        renderWarehouseGrid();
      } else if (state.currentFilter === "video-warehouse") {
        renderVideoWarehouseGrid();
      } else if (state.currentFilter === "lm-warehouse") {
        renderLMWarehouseGrid();
      } else {
        renderPromptGrid();
      }
    }, 150);
  });
}

// ==========================================================================
// IMAGE PROCESSING & CANVAS COMPRESSION HELPER
// ==========================================================================
function handleImageUpload(file) {
  if (!file.type.startsWith("image/")) {
    showToast("이미지 파일만 첨부할 수 있습니다.", "error", "alert-circle");
    return;
  }
  
  showToast("이미지를 압축 및 변환 중...", "info", "refresh-cw");
  
  compressImage(file, (base64Str) => {
    document.getElementById("form-image-data").value = base64Str;
    document.getElementById("modal-image-preview").src = base64Str;
    document.getElementById("modal-image-preview-container").classList.remove("hidden");
    document.getElementById("upload-placeholder").classList.add("hidden");
    showToast("결과 이미지 캡처가 등록되었습니다!", "success", "image");
  });
}

function compressImage(file, callback) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;
    img.onload = () => {
      // Calculate optimized size
      let width = img.width;
      let height = img.height;
      const MAX_WIDTH = 1000;
      const MAX_HEIGHT = 1000;
      
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      
      // Draw to canvas
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      
      // Export as compressed JPEG base64 (75% quality)
      const compressedBase64 = canvas.toDataURL("image/jpeg", 0.75);
      callback(compressedBase64);
    };
  };
}

// ==========================================================================
// ADMIN MODE & EMAIL AUTH LOGIC
// ==========================================================================
let authSuccessCallback = null;
let currentAuthCode = "";
let authTimerInterval = null;
let authExpireTime = 0;

function openEmailAuthModal(callback = null) {
  authSuccessCallback = callback;
  
  // Reset fields
  document.getElementById("auth-email").value = "";
  document.getElementById("auth-code").value = "";
  
  // Show first step
  showEmailStep();
  
  // Show Modal
  document.getElementById("email-auth-modal").classList.add("active");
  setTimeout(() => document.getElementById("auth-email").focus(), 150);
}

function closeEmailAuthModal() {
  document.getElementById("email-auth-modal").classList.remove("active");
  clearInterval(authTimerInterval);
  authSuccessCallback = null;
}

function showEmailStep() {
  document.getElementById("auth-email-step").classList.remove("hidden");
  document.getElementById("auth-code-step").classList.add("hidden");
  clearInterval(authTimerInterval);
}

function handleSendAuthCode() {
  const emailInput = document.getElementById("auth-email");
  const email = emailInput.value.trim();
  
  // simple email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast("올바른 이메일 주소를 입력해주세요.", "error", "alert-circle");
    emailInput.focus();
    return;
  }
  
  // 관리자 이메일 일치 여부 확인
  if (email !== ALLOWED_ADMIN_EMAIL) {
    showToast("등록된 관리자 이메일 주소가 아닙니다.", "error", "alert-circle");
    emailInput.focus();
    return;
  }
  
  // Generate 6-digit random code
  currentAuthCode = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Show Step 2
  document.getElementById("auth-email-step").classList.add("hidden");
  document.getElementById("auth-code-step").classList.remove("hidden");
  
  // Send email via EmailJS
  // 본인의 EmailJS 서비스 ID와 템플릿 ID를 아래에 설정하세요. (예: "service_xxx", "template_xxx")
  emailjs.send("service_o18tne8", "template_kayxrhq", {
    to_email: email,
    auth_code: currentAuthCode
  })
  .then(() => {
    showToast("인증코드가 입력하신 이메일로 실제 발송되었습니다!", "success", "mail");
  })
  .catch((error) => {
    console.error("EmailJS Error:", error);
    showToast("이메일 발송에 실패했습니다. EmailJS 설정을 확인해주세요.", "error", "alert-triangle");
  });
  
  // Start countdown timer (3 minutes)
  startAuthTimer(180);
  
  setTimeout(() => document.getElementById("auth-code").focus(), 150);
}

function handleVerifyAuthCode() {
  const codeInput = document.getElementById("auth-code");
  const code = codeInput.value.trim();
  
  if (Date.now() > authExpireTime) {
    showToast("인증 시간이 만료되었습니다. 다시 시도해주세요.", "error", "clock");
    return;
  }
  
  if (code === currentAuthCode) {
    // Admin Login success!
    state.isAdmin = true;
    
    // Save session in localStorage (expires in 1 hour)
    const session = {
      isAdmin: true,
      expiresAt: Date.now() + 3600000
    };
    localStorage.setItem("prompt_manager_admin_session", JSON.stringify(session));
    
    // Close modal
    closeEmailAuthModal();
    
    // Rerender
    renderApp();
    showToast("관리자 모드가 활성화되었습니다.", "success", "unlock");
    
    // Execute callback if exists
    if (authSuccessCallback) {
      authSuccessCallback();
      authSuccessCallback = null;
    }
  } else {
    showToast("인증 코드가 일치하지 않습니다. 다시 확인해주세요.", "error", "x-circle");
    codeInput.focus();
    codeInput.select();
  }
}

function startAuthTimer(durationSeconds) {
  clearInterval(authTimerInterval);
  authExpireTime = Date.now() + durationSeconds * 1000;
  
  const timerElement = document.getElementById("auth-timer");
  
  function updateTimer() {
    const remaining = Math.max(0, Math.round((authExpireTime - Date.now()) / 1000));
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    
    timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    if (remaining <= 0) {
      clearInterval(authTimerInterval);
      timerElement.textContent = "만료됨";
      showToast("인증코드가 만료되었습니다. 다시 전송받아 주세요.", "warning", "clock");
    }
  }
  
  updateTimer();
  authTimerInterval = setInterval(updateTimer, 1000);
}

function renderAdminUI() {
  const statusBar = document.getElementById("admin-status-bar");
  const statusText = document.getElementById("admin-status-text");
  const lockIcon = document.getElementById("admin-lock-icon");
  const navWarehouse = document.getElementById("nav-warehouse");
  const navVideoWarehouse = document.getElementById("nav-video-warehouse");
  const navLMWarehouse = document.getElementById("nav-lm-warehouse");
  const btnGithubConfig = document.getElementById("btn-github-config");
  
  const btnSyncPromptsPage = document.getElementById("btn-sync-prompts-page");
  const btnExportPromptsPage = document.getElementById("btn-export-prompts-page");
  const btnCopyPromptsJson = document.getElementById("btn-copy-prompts-json");
  const btnNewPromptPage = document.getElementById("btn-new-prompt-page");
  
  const btnSyncFavShare = document.getElementById("btn-sync-fav-share");
  const btnExportFavShare = document.getElementById("btn-export-fav-share");
  const btnCopyFavShareJson = document.getElementById("btn-copy-fav-share-json");
  const btnNewFavShareItem = document.getElementById("btn-new-fav-share-item");
  const btnFavCategoryOrder = document.getElementById("btn-fav-category-order");
  
  if (!statusBar) return;
  
  if (state.isAdmin) {
    statusBar.classList.add("admin-active");
    statusText.textContent = "관리자 모드";
    lockIcon.setAttribute("data-lucide", "unlock");
    
    // Show admin tools
    if (navWarehouse) navWarehouse.style.display = "block";
    if (navVideoWarehouse) navVideoWarehouse.style.display = "block";
    if (navLMWarehouse) navLMWarehouse.style.display = "block";
    if (btnGithubConfig) btnGithubConfig.style.display = "inline-flex";
    
    if (btnSyncPromptsPage) btnSyncPromptsPage.style.display = "inline-flex";
    if (btnExportPromptsPage) btnExportPromptsPage.style.display = "inline-flex";
    if (btnCopyPromptsJson) btnCopyPromptsJson.style.display = "inline-flex";
    if (btnNewPromptPage) btnNewPromptPage.style.display = "inline-flex";
    
    if (btnSyncFavShare) btnSyncFavShare.style.display = "inline-flex";
    if (btnExportFavShare) btnExportFavShare.style.display = "inline-flex";
    if (btnCopyFavShareJson) btnCopyFavShareJson.style.display = "inline-flex";
    if (btnNewFavShareItem) btnNewFavShareItem.style.display = "inline-flex";
    if (btnFavCategoryOrder) btnFavCategoryOrder.style.display = "inline-flex";
  } else {
    statusBar.classList.remove("admin-active");
    statusText.textContent = "일반 사용자 모드";
    lockIcon.setAttribute("data-lucide", "lock");
    
    // Hide admin tools
    if (btnGithubConfig) btnGithubConfig.style.display = "none";
    if (navWarehouse) {
      navWarehouse.style.display = "none";
      // Fallback to default prompts view if logged out while inside warehouse
      if (state.currentFilter === "warehouse") {
        selectQuickFilter("all");
      }
    }
    if (navVideoWarehouse) {
      navVideoWarehouse.style.display = "none";
      // Fallback to default prompts view if logged out while inside warehouse
      if (state.currentFilter === "video-warehouse") {
        selectQuickFilter("all");
      }
    }
    if (navLMWarehouse) {
      navLMWarehouse.style.display = "none";
      // Fallback to default prompts view if logged out while inside warehouse
      if (state.currentFilter === "lm-warehouse") {
        selectQuickFilter("all");
      }
    }
    
    if (btnSyncPromptsPage) btnSyncPromptsPage.style.display = "none";
    if (btnExportPromptsPage) btnExportPromptsPage.style.display = "none";
    if (btnCopyPromptsJson) btnCopyPromptsJson.style.display = "none";
    if (btnNewPromptPage) btnNewPromptPage.style.display = "none";
    
    if (btnSyncFavShare) btnSyncFavShare.style.display = "none";
    if (btnExportFavShare) btnExportFavShare.style.display = "none";
    if (btnCopyFavShareJson) btnCopyFavShareJson.style.display = "none";
    if (btnNewFavShareItem) btnNewFavShareItem.style.display = "none";
    if (btnFavCategoryOrder) btnFavCategoryOrder.style.display = "none";
  }
  
  // Drawer buttons control
  const btnEdit = document.getElementById("btn-detail-edit");
  const btnDelete = document.getElementById("btn-detail-delete");
  
  if (btnEdit && btnDelete) {
    if (state.isAdmin) {
      btnEdit.style.display = "inline-flex";
      btnDelete.style.display = "inline-flex";
    } else {
      btnEdit.style.display = "none";
      btnDelete.style.display = "none";
    }
  }
  
  lucide.createIcons();
}

// ==========================================================================
// PROMPT WAREHOUSE CONTROLLERS
// ==========================================================================
function openWarehouseModal(editingId = null) {
  const form = document.getElementById("warehouse-form");
  form.reset();
  
  // Reset preview fields
  document.getElementById("wh-id").value = "";
  document.getElementById("wh-image-data").value = "";
  document.getElementById("wh-image-preview").src = "";
  document.getElementById("wh-image-preview-container").classList.add("hidden");
  document.getElementById("wh-upload-placeholder").classList.remove("hidden");
  
  const modalTitle = document.getElementById("warehouse-modal-title");
  const submitBtn = document.getElementById("btn-warehouse-modal-submit");
  
  if (editingId && typeof editingId === "string") {
    const item = state.warehouseItems.find(x => x.id === editingId);
    if (!item) return;
    
    modalTitle.textContent = "링크/캡처 자료 수정";
    submitBtn.textContent = "수정하기";
    
    document.getElementById("wh-id").value = item.id;
    document.getElementById("wh-title").value = item.title;
    document.getElementById("wh-url").value = item.url || "";
    document.getElementById("wh-prompt").value = item.prompt || "";
    
    if (item.image) {
      document.getElementById("wh-image-data").value = item.image;
      document.getElementById("wh-image-preview").src = item.image;
      document.getElementById("wh-image-preview-container").classList.remove("hidden");
      document.getElementById("wh-upload-placeholder").classList.add("hidden");
    }
    
    closeDetailDrawer();
  } else {
    modalTitle.textContent = "새 링크/캡처 등록";
    submitBtn.textContent = "등록하기";
  }
  
  document.getElementById("warehouse-modal").classList.add("active");
  setTimeout(() => document.getElementById("wh-title").focus(), 150);
}

function closeWarehouseModal() {
  document.getElementById("warehouse-modal").classList.remove("active");
}

function handleWarehouseImageUpload(file) {
  if (!file.type.startsWith("image/")) {
    showToast("이미지 파일만 첨부할 수 있습니다.", "error", "alert-circle");
    return;
  }
  
  showToast("이미지를 압축 및 변환 중...", "info", "refresh-cw");
  
  compressImage(file, (base64Str) => {
    document.getElementById("wh-image-data").value = base64Str;
    document.getElementById("wh-image-preview").src = base64Str;
    document.getElementById("wh-image-preview-container").classList.remove("hidden");
    document.getElementById("wh-upload-placeholder").classList.add("hidden");
    showToast("캡처 이미지가 임시 등록되었습니다!", "success", "image");
  });
}

function handleWarehouseFormSubmit(e) {
  e.preventDefault();
  
  const id = document.getElementById("wh-id").value;
  const title = document.getElementById("wh-title").value.trim();
  const url = document.getElementById("wh-url").value.trim();
  const prompt = document.getElementById("wh-prompt").value.trim();
  const imageData = document.getElementById("wh-image-data").value;
  
  if (!imageData) {
    showToast("캡처 이미지를 첨부해주세요.", "error", "alert-circle");
    return;
  }
  
  const isEditing = id !== "";
  
  if (isEditing) {
    const idx = state.warehouseItems.findIndex(item => item.id === id);
    if (idx !== -1) {
      state.warehouseItems[idx] = {
        ...state.warehouseItems[idx],
        title,
        url,
        prompt,
        image: imageData,
        updatedAt: new Date().toISOString()
      };
      showToast("창고 자료가 수정되었습니다.", "success", "archive");
    }
  } else {
    const newItem = {
      id: "wh-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9),
      title,
      url,
      prompt,
      image: imageData,
      createdAt: new Date().toISOString()
    };
    state.warehouseItems.push(newItem);
    showToast("창고에 자료가 등록되었습니다.", "success", "archive");
  }
  
  saveWarehouseData();
  closeWarehouseModal();
  renderWarehouseGrid();
  
  if (isEditing) {
    setTimeout(() => {
      openDetailDrawer(id);
    }, 300);
  }
}

function deleteWarehouseItem(id) {
  if (confirm("정말 이 창고 자료를 삭제하시겠습니까?")) {
    state.warehouseItems = state.warehouseItems.filter(item => item.id !== id);
    saveWarehouseData();
    closeDetailDrawer();
    renderWarehouseGrid();
    showToast("자료가 정상적으로 삭제되었습니다.", "info", "trash-2");
  }
}

// ==========================================================================
// GRID PAGINATION HELPERS
// ==========================================================================
function getGridColumnCount(gridElement) {
  if (gridElement) {
    const computedCols = window.getComputedStyle(gridElement).gridTemplateColumns;
    if (computedCols && computedCols !== 'none' && computedCols !== '0px') {
      const cols = computedCols.split(' ').filter(x => x.trim() !== '').length;
      if (cols > 0) return cols;
    }
    const width = gridElement.clientWidth || gridElement.parentElement.clientWidth || (window.innerWidth - 280 - 80);
    if (width > 0) {
      const cols = Math.floor((width + 24) / 344);
      return Math.max(1, cols);
    }
  }
  return 3;
}

function renderPagination(containerId, totalItems, currentPage, pageSize, onPageChangeCallback) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const totalPages = Math.ceil(totalItems / pageSize);
  if (totalPages <= 1) {
    container.innerHTML = "";
    return;
  }
  
  container.innerHTML = "";
  
  // Previous button
  const prevBtn = document.createElement("button");
  prevBtn.className = "pagination-btn pagination-arrow";
  prevBtn.innerHTML = `<i data-lucide="chevron-left"></i> 이전`;
  if (currentPage === 1) {
    prevBtn.disabled = true;
  } else {
    prevBtn.addEventListener("click", () => onPageChangeCallback(currentPage - 1));
  }
  container.appendChild(prevBtn);
  
  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.className = `pagination-btn ${i === currentPage ? 'active' : ''}`;
    pageBtn.textContent = i;
    if (i !== currentPage) {
      pageBtn.addEventListener("click", () => onPageChangeCallback(i));
    }
    container.appendChild(pageBtn);
  }
  
  // Next button
  const nextBtn = document.createElement("button");
  nextBtn.className = "pagination-btn pagination-arrow";
  nextBtn.innerHTML = `다음 <i data-lucide="chevron-right"></i>`;
  if (currentPage === totalPages) {
    nextBtn.disabled = true;
  } else {
    nextBtn.addEventListener("click", () => onPageChangeCallback(currentPage + 1));
  }
  container.appendChild(nextBtn);
  
  lucide.createIcons();
}

function renderWarehouseGrid() {
  const grid = document.getElementById("warehouse-grid");
  const emptyState = document.getElementById("warehouse-empty-state");
  const items = [...state.warehouseItems];
  
  if (items.length === 0) {
    grid.innerHTML = "";
    emptyState.style.display = "flex";
    document.getElementById("warehouse-pagination").innerHTML = "";
    return;
  }
  
  emptyState.style.display = "none";
  grid.innerHTML = "";
  
  // Sort items desc (newest first)
  items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  // Slicing for pagination
  const cols = getGridColumnCount(grid);
  const pageSize = cols * 2;
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  if (state.warehousePage > totalPages) {
    state.warehousePage = Math.max(1, totalPages);
  }
  const startIndex = (state.warehousePage - 1) * pageSize;
  const paginatedItems = items.slice(startIndex, startIndex + pageSize);
  
  paginatedItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "prompt-card";
    
    // Thumbnail section
    const imageHtml = item.image 
      ? `<div class="card-thumbnail-container" style="height: 160px; overflow: hidden; border-radius: 8px; position: relative; cursor: zoom-in;">
           <img src="${item.image}" alt="${escapeHtml(item.title)}" style="width: 100%; height: 100%; object-fit: cover; transition: var(--transition-smooth);">
           <div class="image-overlay-info"><i data-lucide="zoom-in"></i> 클릭하여 확대</div>
         </div>`
      : "";
      
    // Footer button rendering
    const linkBtnHtml = item.url 
      ? `<a href="${item.url}" target="_blank" class="btn btn-primary btn-xs" style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; font-size: 11px; font-weight: 600; border-radius: 6px;">
           <i data-lucide="external-link" style="width: 12px; height: 12px;"></i> 바로가기
         </a>`
      : `<span style="font-size: 11px; color: var(--text-muted);">링크 없음</span>`;
      
    card.innerHTML = `
      <div class="card-body" style="padding: 14px; display: flex; flex-direction: column; gap: 10px;">
        ${imageHtml}
        <h3 class="card-title" style="font-size: 14px; font-weight: 600; line-height: 1.4; height: auto; margin-top: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
          ${escapeHtml(item.title)}
        </h3>
        ${item.prompt ? `
          <div class="card-prompt-section" style="margin-top: 6px; padding: 10px; background-color: var(--bg-main); border-radius: 8px; border: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 6px;">
            <div style="font-size: 11px; font-weight: 600; color: var(--text-muted); display: flex; justify-content: space-between; align-items: center;">
              <span>연관 프롬프트</span>
              <button type="button" class="btn-copy-wh-prompt" style="background: none; border: none; padding: 2px 6px; color: var(--accent-primary); cursor: pointer; display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-family: var(--font-sans); font-weight: 500; background-color: rgba(79, 70, 229, 0.08); border-radius: 4px; transition: var(--transition-fast);">
                <i data-lucide="copy" style="width: 11px; height: 11px;"></i> 복사
              </button>
            </div>
            <pre style="font-size: 12px; color: var(--text-main); font-family: var(--font-mono); white-space: pre-wrap; word-break: break-all; margin: 0; max-height: 80px; overflow-y: auto; line-height: 1.5; padding: 2px 0;">${escapeHtml(item.prompt)}</pre>
          </div>
        ` : ""}
      </div>
      <div class="card-footer" style="padding: 10px 14px; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; background-color: var(--bg-card);">
        ${linkBtnHtml}
        <button class="btn-icon text-danger wh-delete-btn" title="삭제하기" style="padding: 4px;">
          <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
        </button>
      </div>
    `;
    
    // Click events
    if (item.image) {
      card.querySelector(".card-thumbnail-container").addEventListener("click", (e) => {
        e.stopPropagation();
        const lightboxModal = document.getElementById("lightbox-modal");
        const lightboxImage = document.getElementById("lightbox-image");
        lightboxImage.src = item.image;
        lightboxModal.classList.add("active");
      });
    }

    // Copy prompt event
    const copyBtn = card.querySelector(".btn-copy-wh-prompt");
    if (copyBtn) {
      copyBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(item.prompt).then(() => {
          showToast("프롬프트가 복사되었습니다!", "success", "check");
        }).catch(err => {
          showToast("복사에 실패했습니다.", "error", "alert-circle");
        });
      });
    }
    
    card.querySelector(".wh-delete-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      deleteWarehouseItem(item.id);
    });

    card.addEventListener("click", (e) => {
      if (e.target.closest(".btn-copy-wh-prompt") || 
          e.target.closest(".wh-delete-btn") || 
          e.target.closest(".card-thumbnail-container") || 
          e.target.closest("a")) {
        return;
      }
      openDetailDrawer(item.id);
    });
    
    grid.appendChild(card);
  });
  
  renderPagination("warehouse-pagination", totalItems, state.warehousePage, pageSize, (newPage) => {
    state.warehousePage = newPage;
    renderWarehouseGrid();
    document.getElementById("warehouse-main-view").scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  
  lucide.createIcons();
}

// ==========================================================================
// LM STYLE WAREHOUSE CONTROLLERS
// ==========================================================================
function openLMWarehouseModal(editingId = null) {
  const form = document.getElementById("lm-warehouse-form");
  form.reset();
  
  // Reset preview fields
  document.getElementById("lm-wh-id").value = "";
  document.getElementById("lm-wh-image-data").value = "";
  document.getElementById("lm-wh-image-preview").src = "";
  document.getElementById("lm-wh-image-preview-container").classList.add("hidden");
  document.getElementById("lm-wh-upload-placeholder").classList.remove("hidden");
  
  const modalTitle = document.getElementById("lm-warehouse-modal-title");
  const submitBtn = document.getElementById("btn-lm-warehouse-modal-submit");
  
  if (editingId && typeof editingId === "string") {
    const item = state.lmWarehouseItems.find(x => x.id === editingId);
    if (!item) return;
    
    modalTitle.textContent = "LM스타일 자료 수정";
    submitBtn.textContent = "수정하기";
    
    document.getElementById("lm-wh-id").value = item.id;
    document.getElementById("lm-wh-title").value = item.title;
    document.getElementById("lm-wh-url").value = item.url || "";
    document.getElementById("lm-wh-prompt").value = item.prompt || "";
    
    if (item.image) {
      document.getElementById("lm-wh-image-data").value = item.image;
      document.getElementById("lm-wh-image-preview").src = item.image;
      document.getElementById("lm-wh-image-preview-container").classList.remove("hidden");
      document.getElementById("lm-wh-upload-placeholder").classList.add("hidden");
    }
    
    closeDetailDrawer();
  } else {
    modalTitle.textContent = "새 LM스타일 자료 등록";
    submitBtn.textContent = "등록하기";
  }
  
  document.getElementById("lm-warehouse-modal").classList.add("active");
  setTimeout(() => document.getElementById("lm-wh-title").focus(), 150);
}

function closeLMWarehouseModal() {
  document.getElementById("lm-warehouse-modal").classList.remove("active");
}

function handleLMWarehouseImageUpload(file) {
  if (!file.type.startsWith("image/")) {
    showToast("이미지 파일만 첨부할 수 있습니다.", "error", "alert-circle");
    return;
  }
  
  showToast("이미지를 압축 및 변환 중...", "info", "refresh-cw");
  
  compressImage(file, (base64Str) => {
    document.getElementById("lm-wh-image-data").value = base64Str;
    document.getElementById("lm-wh-image-preview").src = base64Str;
    document.getElementById("lm-wh-image-preview-container").classList.remove("hidden");
    document.getElementById("lm-wh-upload-placeholder").classList.add("hidden");
    showToast("캡처 이미지가 임시 등록되었습니다!", "success", "image");
  });
}

function handleLMWarehouseFormSubmit(e) {
  e.preventDefault();
  
  const id = document.getElementById("lm-wh-id").value;
  const title = document.getElementById("lm-wh-title").value.trim();
  const url = document.getElementById("lm-wh-url").value.trim();
  const prompt = document.getElementById("lm-wh-prompt").value.trim();
  const imageData = document.getElementById("lm-wh-image-data").value;
  
  if (!imageData) {
    showToast("캡처 이미지를 첨부해주세요.", "error", "alert-circle");
    return;
  }
  
  const isEditing = id !== "";
  
  if (isEditing) {
    const idx = state.lmWarehouseItems.findIndex(item => item.id === id);
    if (idx !== -1) {
      state.lmWarehouseItems[idx] = {
        ...state.lmWarehouseItems[idx],
        title,
        url,
        prompt,
        image: imageData,
        updatedAt: new Date().toISOString()
      };
      showToast("자료가 수정되었습니다.", "success", "archive");
    }
  } else {
    const newItem = {
      id: "lm-wh-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9),
      title,
      url,
      prompt,
      image: imageData,
      createdAt: new Date().toISOString()
    };
    state.lmWarehouseItems.push(newItem);
    showToast("LM스타일 창고에 자료가 등록되었습니다.", "success", "archive");
  }
  
  saveLMWarehouseData();
  closeLMWarehouseModal();
  renderLMWarehouseGrid();
  
  if (isEditing) {
    setTimeout(() => {
      openDetailDrawer(id);
    }, 300);
  }
}

function deleteLMWarehouseItem(id) {
  if (confirm("정말 이 자료를 삭제하시겠습니까?")) {
    state.lmWarehouseItems = state.lmWarehouseItems.filter(item => item.id !== id);
    saveLMWarehouseData();
    closeDetailDrawer();
    renderLMWarehouseGrid();
    showToast("자료가 정상적으로 삭제되었습니다.", "info", "trash-2");
  }
}

function renderLMWarehouseGrid() {
  const grid = document.getElementById("lm-warehouse-grid");
  const emptyState = document.getElementById("lm-warehouse-empty-state");
  const items = [...state.lmWarehouseItems];
  
  if (items.length === 0) {
    grid.innerHTML = "";
    emptyState.style.display = "flex";
    document.getElementById("lm-warehouse-pagination").innerHTML = "";
    return;
  }
  
  emptyState.style.display = "none";
  grid.innerHTML = "";
  
  // Sort items desc (newest first)
  items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  // Slicing for pagination
  const cols = getGridColumnCount(grid);
  const pageSize = cols * 2;
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  if (state.lmWarehousePage > totalPages) {
    state.lmWarehousePage = Math.max(1, totalPages);
  }
  const startIndex = (state.lmWarehousePage - 1) * pageSize;
  const paginatedItems = items.slice(startIndex, startIndex + pageSize);
  
  paginatedItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "prompt-card";
    
    // Thumbnail section
    const imageHtml = item.image 
      ? `<div class="card-thumbnail-container" style="height: 160px; overflow: hidden; border-radius: 8px; position: relative; cursor: zoom-in;">
           <img src="${item.image}" alt="${escapeHtml(item.title)}" style="width: 100%; height: 100%; object-fit: cover; transition: var(--transition-smooth);">
           <div class="image-overlay-info"><i data-lucide="zoom-in"></i> 클릭하여 확대</div>
         </div>`
      : "";
      
    // Footer button rendering
    const linkBtnHtml = item.url 
      ? `<a href="${item.url}" target="_blank" class="btn btn-primary btn-xs" style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; font-size: 11px; font-weight: 600; border-radius: 6px;">
           <i data-lucide="external-link" style="width: 12px; height: 12px;"></i> 바로가기
         </a>`
      : `<span style="font-size: 11px; color: var(--text-muted);">링크 없음</span>`;
      
    card.innerHTML = `
      <div class="card-body" style="padding: 14px; display: flex; flex-direction: column; gap: 10px;">
        ${imageHtml}
        <h3 class="card-title" style="font-size: 14px; font-weight: 600; line-height: 1.4; height: auto; margin-top: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
          ${escapeHtml(item.title)}
        </h3>
        ${item.prompt ? `
          <div class="card-prompt-section" style="margin-top: 6px; padding: 10px; background-color: var(--bg-main); border-radius: 8px; border: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 6px;">
            <div style="font-size: 11px; font-weight: 600; color: var(--text-muted); display: flex; justify-content: space-between; align-items: center;">
              <span>연관 프롬프트</span>
              <button type="button" class="btn-copy-wh-prompt" style="background: none; border: none; padding: 2px 6px; color: var(--accent-primary); cursor: pointer; display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-family: var(--font-sans); font-weight: 500; background-color: rgba(79, 70, 229, 0.08); border-radius: 4px; transition: var(--transition-fast);">
                <i data-lucide="copy" style="width: 11px; height: 11px;"></i> 복사
              </button>
            </div>
            <pre style="font-size: 12px; color: var(--text-main); font-family: var(--font-mono); white-space: pre-wrap; word-break: break-all; margin: 0; max-height: 80px; overflow-y: auto; line-height: 1.5; padding: 2px 0;">${escapeHtml(item.prompt)}</pre>
          </div>
        ` : ""}
      </div>
      <div class="card-footer" style="padding: 10px 14px; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; background-color: var(--bg-card);">
        ${linkBtnHtml}
        <button class="btn-icon text-danger wh-delete-btn" title="삭제하기" style="padding: 4px;">
          <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
        </button>
      </div>
    `;
    
    // Click events
    if (item.image) {
      card.querySelector(".card-thumbnail-container").addEventListener("click", (e) => {
        e.stopPropagation();
        const lightboxModal = document.getElementById("lightbox-modal");
        const lightboxImage = document.getElementById("lightbox-image");
        lightboxImage.src = item.image;
        lightboxModal.classList.add("active");
      });
    }

    // Copy prompt event
    const copyBtn = card.querySelector(".btn-copy-wh-prompt");
    if (copyBtn) {
      copyBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(item.prompt).then(() => {
          showToast("프롬프트가 복사되었습니다!", "success", "check");
        }).catch(err => {
          showToast("복사에 실패했습니다.", "error", "alert-circle");
        });
      });
    }
    
    card.querySelector(".wh-delete-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      deleteLMWarehouseItem(item.id);
    });

    grid.appendChild(card);
  });
  
  renderPagination("lm-warehouse-pagination", totalItems, state.lmWarehousePage, pageSize, (newPage) => {
    state.lmWarehousePage = newPage;
    renderLMWarehouseGrid();
    document.getElementById("lm-warehouse-main-view").scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  
  lucide.createIcons();
}

// ==========================================================================
// VIDEO PROMPT WAREHOUSE CONTROLLERS
// ==========================================================================
function openVideoWarehouseModal(editingId = null) {
  const form = document.getElementById("video-warehouse-form");
  form.reset();
  
  // Reset preview fields
  document.getElementById("video-wh-id").value = "";
  document.getElementById("video-wh-image-data").value = "";
  document.getElementById("video-wh-image-preview").src = "";
  document.getElementById("video-wh-image-preview-container").classList.add("hidden");
  document.getElementById("video-wh-upload-placeholder").classList.remove("hidden");
  
  const modalTitle = document.getElementById("video-warehouse-modal-title");
  const submitBtn = document.getElementById("btn-video-warehouse-modal-submit");
  
  if (editingId && typeof editingId === "string") {
    const item = state.videoWarehouseItems.find(x => x.id === editingId);
    if (!item) return;
    
    modalTitle.textContent = "영상 프롬프트 자료 수정";
    submitBtn.textContent = "수정하기";
    
    document.getElementById("video-wh-id").value = item.id;
    document.getElementById("video-wh-title").value = item.title;
    document.getElementById("video-wh-url").value = item.url || "";
    document.getElementById("video-wh-prompt").value = item.prompt || "";
    
    if (item.image) {
      document.getElementById("video-wh-image-data").value = item.image;
      document.getElementById("video-wh-image-preview").src = item.image;
      document.getElementById("video-wh-image-preview-container").classList.remove("hidden");
      document.getElementById("video-wh-upload-placeholder").classList.add("hidden");
    }
    
    closeDetailDrawer();
  } else {
    modalTitle.textContent = "새 영상 프롬프트 자료 등록";
    submitBtn.textContent = "등록하기";
  }
  
  document.getElementById("video-warehouse-modal").classList.add("active");
  setTimeout(() => document.getElementById("video-wh-title").focus(), 150);
}

function closeVideoWarehouseModal() {
  document.getElementById("video-warehouse-modal").classList.remove("active");
}

function handleVideoWarehouseImageUpload(file) {
  if (!file.type.startsWith("image/")) {
    showToast("이미지 파일만 첨부할 수 있습니다.", "error", "alert-circle");
    return;
  }
  
  showToast("이미지를 압축 및 변환 중...", "info", "refresh-cw");
  
  compressImage(file, (base64Str) => {
    document.getElementById("video-wh-image-data").value = base64Str;
    document.getElementById("video-wh-image-preview").src = base64Str;
    document.getElementById("video-wh-image-preview-container").classList.remove("hidden");
    document.getElementById("video-wh-upload-placeholder").classList.add("hidden");
    showToast("캡처 이미지가 임시 등록되었습니다!", "success", "image");
  });
}

function handleVideoWarehouseFormSubmit(e) {
  e.preventDefault();
  
  const id = document.getElementById("video-wh-id").value;
  const title = document.getElementById("video-wh-title").value.trim();
  const url = document.getElementById("video-wh-url").value.trim();
  const prompt = document.getElementById("video-wh-prompt").value.trim();
  const imageData = document.getElementById("video-wh-image-data").value;
  
  if (!imageData) {
    showToast("캡처 이미지를 첨부해주세요.", "error", "alert-circle");
    return;
  }
  
  const isEditing = id !== "";
  
  if (isEditing) {
    const idx = state.videoWarehouseItems.findIndex(item => item.id === id);
    if (idx !== -1) {
      state.videoWarehouseItems[idx] = {
        ...state.videoWarehouseItems[idx],
        title,
        url,
        prompt,
        image: imageData,
        updatedAt: new Date().toISOString()
      };
      showToast("영상 프롬프트 자료가 수정되었습니다.", "success", "archive");
    }
  } else {
    const newItem = {
      id: "vid-wh-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9),
      title,
      url,
      prompt,
      image: imageData,
      createdAt: new Date().toISOString()
    };
    state.videoWarehouseItems.push(newItem);
    showToast("영상 프롬프트 창고에 자료가 등록되었습니다.", "success", "archive");
  }
  
  saveVideoWarehouseData();
  closeVideoWarehouseModal();
  renderVideoWarehouseGrid();
  
  if (isEditing) {
    setTimeout(() => {
      openDetailDrawer(id);
    }, 300);
  }
}

function deleteVideoWarehouseItem(id) {
  if (confirm("정말 이 자료를 삭제하시겠습니까?")) {
    state.videoWarehouseItems = state.videoWarehouseItems.filter(item => item.id !== id);
    saveVideoWarehouseData();
    closeDetailDrawer();
    renderVideoWarehouseGrid();
    showToast("자료가 정상적으로 삭제되었습니다.", "info", "trash-2");
  }
}

function renderVideoWarehouseGrid() {
  const grid = document.getElementById("video-warehouse-grid");
  const emptyState = document.getElementById("video-warehouse-empty-state");
  const items = [...state.videoWarehouseItems];
  
  if (items.length === 0) {
    grid.innerHTML = "";
    emptyState.style.display = "flex";
    document.getElementById("video-warehouse-pagination").innerHTML = "";
    return;
  }
  
  emptyState.style.display = "none";
  grid.innerHTML = "";
  
  // Sort items desc (newest first)
  items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  // Slicing for pagination
  const cols = getGridColumnCount(grid);
  const pageSize = cols * 2;
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  if (state.videoWarehousePage > totalPages) {
    state.videoWarehousePage = Math.max(1, totalPages);
  }
  const startIndex = (state.videoWarehousePage - 1) * pageSize;
  const paginatedItems = items.slice(startIndex, startIndex + pageSize);
  
  paginatedItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "prompt-card";
    
    // Thumbnail section
    const imageHtml = item.image 
      ? `<div class="card-thumbnail-container" style="height: 160px; overflow: hidden; border-radius: 8px; position: relative; cursor: zoom-in;">
           <img src="${item.image}" alt="${escapeHtml(item.title)}" style="width: 100%; height: 100%; object-fit: cover; transition: var(--transition-smooth);">
           <div class="image-overlay-info"><i data-lucide="zoom-in"></i> 클릭하여 확대</div>
         </div>`
      : "";
      
    // Footer button rendering
    const linkBtnHtml = item.url 
      ? `<a href="${item.url}" target="_blank" class="btn btn-primary btn-xs" style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; font-size: 11px; font-weight: 600; border-radius: 6px;">
           <i data-lucide="external-link" style="width: 12px; height: 12px;"></i> 바로가기
         </a>`
      : `<span style="font-size: 11px; color: var(--text-muted);">링크 없음</span>`;
      
    card.innerHTML = `
      <div class="card-body" style="padding: 14px; display: flex; flex-direction: column; gap: 10px;">
        ${imageHtml}
        <h3 class="card-title" style="font-size: 14px; font-weight: 600; line-height: 1.4; height: auto; margin-top: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
          ${escapeHtml(item.title)}
        </h3>
        ${item.prompt ? `
          <div class="card-prompt-section" style="margin-top: 6px; padding: 10px; background-color: var(--bg-main); border-radius: 8px; border: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 6px;">
            <div style="font-size: 11px; font-weight: 600; color: var(--text-muted); display: flex; justify-content: space-between; align-items: center;">
              <span>연관 프롬프트</span>
              <button type="button" class="btn-copy-wh-prompt" style="background: none; border: none; padding: 2px 6px; color: var(--accent-primary); cursor: pointer; display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-family: var(--font-sans); font-weight: 500; background-color: rgba(79, 70, 229, 0.08); border-radius: 4px; transition: var(--transition-fast);">
                <i data-lucide="copy" style="width: 11px; height: 11px;"></i> 복사
              </button>
            </div>
            <pre style="font-size: 12px; color: var(--text-main); font-family: var(--font-mono); white-space: pre-wrap; word-break: break-all; margin: 0; max-height: 80px; overflow-y: auto; line-height: 1.5; padding: 2px 0;">${escapeHtml(item.prompt)}</pre>
          </div>
        ` : ""}
      </div>
      <div class="card-footer" style="padding: 10px 14px; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; background-color: var(--bg-card);">
        ${linkBtnHtml}
        <button class="btn-icon text-danger wh-delete-btn" title="삭제하기" style="padding: 4px;">
          <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
        </button>
      </div>
    `;
    
    // Click events
    if (item.image) {
      card.querySelector(".card-thumbnail-container").addEventListener("click", (e) => {
        e.stopPropagation();
        const lightboxModal = document.getElementById("lightbox-modal");
        const lightboxImage = document.getElementById("lightbox-image");
        lightboxImage.src = item.image;
        lightboxModal.classList.add("active");
      });
    }

    // Copy prompt event
    const copyBtn = card.querySelector(".btn-copy-wh-prompt");
    if (copyBtn) {
      copyBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(item.prompt).then(() => {
          showToast("프롬프트가 복사되었습니다!", "success", "check");
        }).catch(err => {
          showToast("복사에 실패했습니다.", "error", "alert-circle");
        });
      });
    }
    
    card.querySelector(".wh-delete-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      deleteVideoWarehouseItem(item.id);
    });

    card.addEventListener("click", (e) => {
      if (e.target.closest(".btn-copy-wh-prompt") || 
          e.target.closest(".wh-delete-btn") || 
          e.target.closest(".card-thumbnail-container") || 
          e.target.closest("a")) {
        return;
      }
      openDetailDrawer(item.id);
    });
    
    grid.appendChild(card);
  });
  
  renderPagination("video-warehouse-pagination", totalItems, state.videoWarehousePage, pageSize, (newPage) => {
    state.videoWarehousePage = newPage;
    renderVideoWarehouseGrid();
    document.getElementById("video-warehouse-main-view").scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  
  lucide.createIcons();
}

// Safely encode prompt state into base64 (supporting Unicode/Korean)
function encodePromptState(stateObj) {
  try {
    const jsonStr = JSON.stringify(stateObj);
    const utf8Bytes = new TextEncoder().encode(jsonStr);
    let binaryStr = "";
    utf8Bytes.forEach(b => binaryStr += String.fromCharCode(b));
    return btoa(binaryStr);
  } catch (e) {
    console.error(e);
    return "";
  }
}

// Safely decode base64 back into prompt state object
function decodePromptState(base64Str) {
  try {
    const binaryStr = atob(base64Str);
    const len = binaryStr.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }
    const jsonStr = new TextDecoder().decode(bytes);
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error(e);
    return null;
  }
}

// Deep linking helper
function handleDeepLink() {
  const urlParams = new URLSearchParams(window.location.search);
  const sharedPromptId = urlParams.get('id');
  const shareStateBase64 = urlParams.get('shareState');
  
  if (shareStateBase64) {
    const decoded = decodePromptState(shareStateBase64);
    if (decoded) {
      setTimeout(() => {
        openModal(null, decoded);
        // Clean URL query parameters
        window.history.replaceState({}, document.title, window.location.pathname);
      }, 500);
    } else {
      showToast("공유된 프롬프트 데이터를 해석할 수 없습니다.", "error", "alert-circle");
    }
  } else if (sharedPromptId) {
    const prompt = state.prompts.find(p => p.id === sharedPromptId);
    if (prompt) {
      setTimeout(() => {
        openDetailDrawer(sharedPromptId);
        window.history.replaceState({}, document.title, window.location.pathname);
      }, 500);
    } else {
      showToast("공유된 프롬프트를 찾을 수 없습니다.", "error", "alert-circle");
    }
  }
}

// ==========================================================================
// FAVORITES SHARE CONTROLLERS & GRID RENDER
// ==========================================================================
function saveFavShareData() {
  try {
    localStorage.setItem("prompt_manager_fav_share_data", JSON.stringify(state.favShareItems));
    localStorage.setItem("prompt_manager_fav_share_initialized", "true");
  } catch (e) {
    console.warn("로컬 스토리지 저장 실패 (용량 초과 가능성):", e);
  }
}

async function ensureFavShareLoaded() {
  if (state.favShareLoaded) return;
  
  const localFavShare = localStorage.getItem("prompt_manager_fav_share_data");
  const favShareInitialized = localStorage.getItem("prompt_manager_fav_share_initialized");
  if (localFavShare && favShareInitialized) {
    try {
      const data = JSON.parse(localFavShare);
      state.favShareItems = Array.isArray(data) ? data : (data.value || []);
      state.favShareLoaded = true;
      return;
    } catch (e) {
      console.error("로컬 즐겨찾기 데이터 파싱 실패", e);
    }
  }
  
  try {
    showToast("서버에서 즐겨찾기 데이터를 로드하는 중...", "info", "refresh-cw");
    const response = await fetch("fav_share_data.json?t=" + Date.now());
    if (response.ok) {
      const data = await response.json();
      state.favShareItems = Array.isArray(data) ? data : (data.value || []);
      try {
        saveFavShareData();
        localStorage.setItem("prompt_manager_fav_share_initialized", "true");
      } catch (storageError) {
        console.warn("로컬 스토리지 저장 실패 (용량 초과 가능성). 데이터는 메모리에서 유지됩니다.", storageError);
      }
      showToast("즐겨찾기 데이터를 성공적으로 로드했습니다.", "success", "check");
    } else {
      state.favShareItems = [];
    }
  } catch (e) {
    console.warn("fav_share_data.json 로드 실패. 빈 배열로 시작합니다.", e);
    state.favShareItems = [];
  }
  state.favShareLoaded = true;
}

function populateFavCategoriesDropdown(selectedValue = "") {
  const select = document.getElementById("fav-category");
  const inputNew = document.getElementById("fav-category-new");
  const btn = document.getElementById("btn-toggle-fav-new-category");
  
  if (!select) return;
  
  // 1. Get unique categories
  const categories = [...new Set(state.favShareItems.filter(x => x.id !== "config-category-order").map(item => (item.category || "").trim()))]
    .filter(cat => cat !== "")
    .sort();
  
  // 2. Clear options except the first one
  select.innerHTML = '<option value="" disabled selected>선택하세요</option>';
  
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
  
  // Reset visibility
  select.classList.remove("hidden");
  select.required = true;
  inputNew.classList.add("hidden");
  inputNew.required = false;
  inputNew.value = "";
  
  btn.innerHTML = `<i data-lucide="plus"></i>`;
  btn.title = "새 카테고리 추가";
  
  // Select value if provided and exists
  if (selectedValue) {
    if (categories.includes(selectedValue)) {
      select.value = selectedValue;
    } else {
      // If selectedValue is new, show text input
      select.classList.add("hidden");
      select.required = false;
      inputNew.classList.remove("hidden");
      inputNew.required = true;
      inputNew.value = selectedValue;
      btn.innerHTML = `<i data-lucide="list"></i>`;
      btn.title = "목록에서 선택";
    }
  } else {
    select.value = "";
  }
  lucide.createIcons();
}

function toggleFavNewCategoryInput() {
  const select = document.getElementById("fav-category");
  const inputNew = document.getElementById("fav-category-new");
  const btn = document.getElementById("btn-toggle-fav-new-category");
  
  if (inputNew.classList.contains("hidden")) {
    select.classList.add("hidden");
    select.required = false;
    inputNew.classList.remove("hidden");
    inputNew.required = true;
    inputNew.focus();
    btn.innerHTML = `<i data-lucide="list"></i>`;
    btn.title = "목록에서 선택";
  } else {
    select.classList.remove("hidden");
    select.required = true;
    inputNew.classList.add("hidden");
    inputNew.required = false;
    btn.innerHTML = `<i data-lucide="plus"></i>`;
    btn.title = "새 카테고리 추가";
  }
  lucide.createIcons();
}

function openFavShareModal(editingId = null) {
  const form = document.getElementById("fav-share-form");
  form.reset();
  
  document.getElementById("fav-id").value = "";
  
  const modalTitle = document.getElementById("fav-share-modal-title");
  const submitBtn = document.getElementById("btn-fav-share-modal-submit");
  
  if (editingId && typeof editingId === "string") {
    const item = state.favShareItems.find(x => x.id === editingId);
    if (!item) return;
    
    modalTitle.textContent = "즐겨찾기 수정";
    submitBtn.textContent = "수정하기";
    
    document.getElementById("fav-id").value = item.id;
    document.getElementById("fav-title").value = item.title;
    document.getElementById("fav-url").value = item.url;
    document.getElementById("fav-desc").value = item.desc || "";
    
    populateFavCategoriesDropdown(item.category || "");
  } else {
    modalTitle.textContent = "새 즐겨찾기 등록";
    submitBtn.textContent = "등록하기";
    
    populateFavCategoriesDropdown("");
  }
  
  document.getElementById("fav-share-modal").classList.add("active");
  setTimeout(() => document.getElementById("fav-title").focus(), 150);
}

function closeFavShareModal() {
  document.getElementById("fav-share-modal").classList.remove("active");
}

function handleFavShareFormSubmit(e) {
  e.preventDefault();
  
  const id = document.getElementById("fav-id").value;
  const title = document.getElementById("fav-title").value.trim();
  
  // Category determination (dropdown vs new text input)
  const selectCat = document.getElementById("fav-category").value;
  const newCatInput = document.getElementById("fav-category-new");
  let category = "";
  
  if (newCatInput && !newCatInput.classList.contains("hidden")) {
    category = newCatInput.value.trim();
  } else {
    category = selectCat;
  }
  
  const url = document.getElementById("fav-url").value.trim();
  const desc = document.getElementById("fav-desc").value.trim();
  
  if (!title || !url || !category) {
    showToast("필수 입력 필드를 채워주세요.", "error", "alert-circle");
    return;
  }
  
  const isEditing = id !== "";
  
  if (isEditing) {
    const idx = state.favShareItems.findIndex(item => item.id === id);
    if (idx !== -1) {
      state.favShareItems[idx] = {
        ...state.favShareItems[idx],
        title,
        category,
        url,
        desc,
        updatedAt: new Date().toISOString()
      };
      showToast("즐겨찾기 정보가 수정되었습니다.", "success", "bookmark");
    }
  } else {
    const newItem = {
      id: "fav-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9),
      title,
      category,
      url,
      desc,
      createdAt: new Date().toISOString()
    };
    state.favShareItems.push(newItem);
    showToast("즐겨찾기가 새로 등록되었습니다.", "success", "bookmark");
  }
  
  saveFavShareData();
  closeFavShareModal();
  renderFavShareGrid();
}

function deleteFavShareItem(id) {
  if (confirm("정말 이 즐겨찾기를 삭제하시겠습니까?")) {
    state.favShareItems = state.favShareItems.filter(item => item.id !== id);
    saveFavShareData();
    renderFavShareGrid();
    showToast("즐겨찾기가 정상적으로 삭제되었습니다.", "info", "trash-2");
  }
}

function renderFavShareGrid() {
  const container = document.getElementById("fav-share-container");
  const emptyState = document.getElementById("fav-share-empty-state");
  const items = state.favShareItems.filter(p => p.id !== "config-category-order");
  
  if (items.length === 0) {
    if (container) container.innerHTML = "";
    emptyState.style.display = "flex";
    return;
  }
  
  emptyState.style.display = "none";
  if (container) container.innerHTML = "";
  
  // Sort items desc (newest first)
  items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  // Group by category
  const groups = {};
  items.forEach(item => {
    const cat = (item.category || "미지정").trim();
    if (!groups[cat]) {
      groups[cat] = [];
    }
    groups[cat].push(item);
  });
  
  // Sort category names by saved order or fallback to default
  const categories = Object.keys(groups);
  const savedOrder = getFavCategoryOrder();
  
  if (savedOrder.length > 0) {
    categories.sort((a, b) => {
      const idxA = savedOrder.indexOf(a);
      const idxB = savedOrder.indexOf(b);
      if (idxA !== -1 && idxB !== -1) {
        return idxA - idxB;
      }
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      if (a === "미지정") return 1;
      if (b === "미지정") return -1;
      return a.localeCompare(b);
    });
  } else {
    categories.sort((a, b) => {
      if (a === "미지정") return 1;
      if (b === "미지정") return -1;
      return a.localeCompare(b);
    });
  }
  
  categories.forEach(category => {
    const section = document.createElement("div");
    section.className = "fav-category-section";
    section.style.marginBottom = "32px";
    
    section.innerHTML = `
      <h3 style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 12px; display: flex; align-items: center; gap: 8px; border-bottom: 1px dashed var(--border-color); padding-bottom: 8px;">
        <i data-lucide="folder" style="width: 15px; height: 15px; color: var(--accent-primary);"></i>
        <span>${escapeHtml(category)}</span>
        <span style="font-size: 11px; font-weight: 500; color: var(--text-muted); margin-left: 4px;">(${groups[category].length})</span>
      </h3>
      <div class="fav-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
      </div>
    `;
    
    const grid = section.querySelector(".fav-grid");
    
    groups[category].forEach(item => {
      const card = document.createElement("div");
      card.className = "fav-card";
      
      // Admin Edit/Delete buttons html
      const adminActionsHtml = state.isAdmin 
        ? `<div style="display: flex; gap: 6px;">
             <button class="btn-icon text-primary fav-edit-btn" title="수정하기" style="padding: 4px; width: 28px; height: 28px; border-radius: 6px;">
               <i data-lucide="edit-3" style="width: 13px; height: 13px;"></i>
             </button>
             <button class="btn-icon text-danger fav-delete-btn" title="삭제하기" style="padding: 4px; width: 28px; height: 28px; border-radius: 6px;">
               <i data-lucide="trash-2" style="width: 13px; height: 13px;"></i>
             </button>
           </div>`
        : "";
        
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
          <h3 style="font-size: 14px; font-weight: 700; color: var(--text-main); word-break: keep-all; line-height: 1.4; margin: 0; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">
            ${escapeHtml(item.title)}
          </h3>
        </div>
        <div style="margin: 2px 0 6px; flex-grow: 1;">
          <p style="font-size: 12.5px; color: var(--text-muted); line-height: 1.45; margin: 0; word-break: keep-all; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">
            ${escapeHtml(item.desc || "상세 설명이 없습니다.")}
          </p>
        </div>
        <div class="card-footer" style="padding-top: 8px; margin-top: auto; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; background-color: transparent;">
          <a href="${item.url}" target="_blank" class="btn btn-primary btn-xs" style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; font-size: 11px; font-weight: 600; border-radius: 6px;">
            <i data-lucide="external-link" style="width: 12px; height: 12px;"></i> 바로가기
          </a>
          ${adminActionsHtml}
        </div>
      `;
      
      // Event listeners for admin actions
      if (state.isAdmin) {
        card.querySelector(".fav-edit-btn").addEventListener("click", (e) => {
          e.stopPropagation();
          openFavShareModal(item.id);
        });
        card.querySelector(".fav-delete-btn").addEventListener("click", (e) => {
          e.stopPropagation();
          deleteFavShareItem(item.id);
        });
      }
      
      grid.appendChild(card);
    });
    
    if (container) container.appendChild(section);
  });
  
  lucide.createIcons();
}

// Get Category order from config item or local storage
function getFavCategoryOrder() {
  const configItem = state.favShareItems.find(x => x.id === "config-category-order");
  if (configItem && configItem.categoryOrder) {
    return configItem.categoryOrder;
  }
  const local = localStorage.getItem("prompt_manager_fav_category_order");
  if (local) {
    try {
      return JSON.parse(local);
    } catch(e) {}
  }
  return [];
}

// Save Category order to config item and local storage
function saveFavCategoryOrder(order) {
  localStorage.setItem("prompt_manager_fav_category_order", JSON.stringify(order));
  
  let configItem = state.favShareItems.find(x => x.id === "config-category-order");
  if (configItem) {
    configItem.categoryOrder = order;
  } else {
    configItem = {
      id: "config-category-order",
      title: "Config - Category Order",
      url: "",
      desc: "",
      category: "",
      categoryOrder: order,
      createdAt: new Date().toISOString()
    };
    state.favShareItems.push(configItem);
  }
  saveFavShareData();
}

let tempCategoryOrder = [];

function openFavCategoryOrderModal() {
  const modal = document.getElementById("fav-category-order-modal");
  
  // Get currently active categories
  const activeCategories = [...new Set(state.favShareItems
    .filter(x => x.id !== "config-category-order")
    .map(item => (item.category || "미지정").trim()))]
    .filter(Boolean);
    
  // Load saved order
  const savedOrder = getFavCategoryOrder();
  
  // Sort activeCategories by savedOrder index first
  activeCategories.sort((a, b) => {
    const idxA = savedOrder.indexOf(a);
    const idxB = savedOrder.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b);
  });
  
  tempCategoryOrder = [...activeCategories];
  renderCategoryOrderList();
  
  modal.classList.add("active");
}

function renderCategoryOrderList() {
  const list = document.getElementById("fav-category-order-list");
  list.innerHTML = "";
  
  if (tempCategoryOrder.length === 0) {
    list.innerHTML = `<li style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 13px;">등록된 카테고리가 없습니다.</li>`;
    return;
  }
  
  tempCategoryOrder.forEach((cat, index) => {
    const li = document.createElement("li");
    li.setAttribute("data-category", cat);
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    li.style.padding = "10px 14px";
    li.style.borderBottom = "1px solid var(--border-color)";
    li.style.fontSize = "13px";
    li.style.color = "var(--text-main)";
    
    li.innerHTML = `
      <span style="font-weight: 600;">${escapeHtml(cat)}</span>
      <div style="display: flex; gap: 4px;">
        <button type="button" class="btn-icon btn-category-up" style="padding: 2px; width: 24px; height: 24px; border-radius: 4px; border: 1px solid var(--border-color); background-color: var(--bg-main);" title="위로 이동">
          <i data-lucide="chevron-up" style="width: 14px; height: 14px;"></i>
        </button>
        <button type="button" class="btn-icon btn-category-down" style="padding: 2px; width: 24px; height: 24px; border-radius: 4px; border: 1px solid var(--border-color); background-color: var(--bg-main);" title="아래로 이동">
          <i data-lucide="chevron-down" style="width: 14px; height: 14px;"></i>
        </button>
      </div>
    `;
    
    // Up/Down button events
    li.querySelector(".btn-category-up").addEventListener("click", () => {
      if (index > 0) {
        const temp = tempCategoryOrder[index - 1];
        tempCategoryOrder[index - 1] = tempCategoryOrder[index];
        tempCategoryOrder[index] = temp;
        renderCategoryOrderList();
      }
    });
    
    li.querySelector(".btn-category-down").addEventListener("click", () => {
      if (index < tempCategoryOrder.length - 1) {
        const temp = tempCategoryOrder[index + 1];
        tempCategoryOrder[index + 1] = tempCategoryOrder[index];
        tempCategoryOrder[index] = temp;
        renderCategoryOrderList();
      }
    });
    
    list.appendChild(li);
  });
  
  lucide.createIcons();
}

function closeFavCategoryOrderModal() {
  document.getElementById("fav-category-order-modal").classList.remove("active");
}

async function syncFavShareToServer() {
  await ensureFavShareLoaded();
  let config = JSON.parse(localStorage.getItem("prompt_manager_github_config"));
  
  if (config && config.owner && config.repo) {
    if (confirm(`GitHub 저장소 (${config.owner}/${config.repo})의 ${config.branch || 'main'} 브랜치에 현재 즐겨찾기 데이터를 저장하시겠습니까?`)) {
      await uploadFileToGitHub("fav_share_data.json", state.favShareItems);
    } else {
      openGithubConfigModal(async () => {
        if (confirm("새로 저장된 설정으로 동기화를 바로 진행하시겠습니까?")) {
          await uploadFileToGitHub("fav_share_data.json", state.favShareItems);
        }
      });
    }
  } else {
    openGithubConfigModal(async () => {
      await uploadFileToGitHub("fav_share_data.json", state.favShareItems);
    });
  }
}

async function exportFavShareData() {
  await ensureFavShareLoaded();
  downloadJsonFile("fav_share_data.json", state.favShareItems);
}

async function copyFavShareJson() {
  await ensureFavShareLoaded();
  const dataStr = JSON.stringify(state.favShareItems, null, 2);
  navigator.clipboard.writeText(dataStr).then(() => {
    showToast("즐겨찾기 데이터(JSON)가 클립보드에 복사되었습니다!", "success", "copy");
  }).catch(err => {
    console.error(err);
    showToast("복사에 실패했습니다. 권한을 확인해주세요.", "error", "alert-circle");
  });
}

function copyPromptsJson() {
  const dataStr = JSON.stringify(state.prompts, null, 2);
  navigator.clipboard.writeText(dataStr).then(() => {
    showToast("프롬프트 데이터(JSON)가 클립보드에 복사되었습니다!", "success", "copy");
  }).catch(err => {
    console.error(err);
    showToast("복사에 실패했습니다. 권한을 확인해주세요.", "error", "alert-circle");
  });
}
