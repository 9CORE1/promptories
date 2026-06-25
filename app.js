// ==========================================================================
// DEFAULT SAMPLE DATA
// ==========================================================================
const DEFAULT_PROMPTS = [
  {
    id: "default-email-translation",
    title: "영한 비즈니스 이메일 번역기",
    category: "번역",
    tags: ["번역", "비즈니스", "영어"],
    promptText: "당신은 글로벌 IT 기업의 전문 번역가입니다. 다음 한국어 이메일 내용을 수신자({{수신자_관계}})에 알맞은 정중하고 자연스러운 비즈니스 영어 이메일로 번역해주세요.\n전문적인 톤앤매너를 유지하고, 비즈니스 이메일 표준 서식(인사말, 본문, 맺음말)을 갖추어 주세요.\n\n[이메일 본문]\n{{이메일_본문}}\n\n[추가 요청사항]\n{{추가_요청사항}}",
    outputText: "Subject: Inquiry Regarding the Partnership Proposal\n\nDear Mr. Smith,\n\nI hope this email finds you well.\nMy name is Min-su Kim, Project Manager of the Global Business Team at ABC Corp.\n\nI am writing to discuss the partnership proposal we received last week. We are very interested in collaborating on the upcoming integration project and would like to schedule a brief meeting next week to align on the next steps.\n\nPlease let us know your availability.\n\nSincerely,\nMin-su Kim\nProject Manager",
    description: "수신자와의 관계(예: 클라이언트, 협력업체, 사내동료)에 최적화하여 격식 있는 비즈니스 영어 이메일로 번역합니다.",
    recommendedModel: "GPT-4o",
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
    recommendedModel: "Claude 3.5 Sonnet",
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
    recommendedModel: "GPT-4o",
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
    recommendedModel: "Gemini 1.5 Flash",
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
    recommendedModel: "Claude 3.5 Sonnet",
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
  isAdmin: false,                 // 관리자 모드 인증 여부
  warehouseItems: [],
  warehouseLoaded: false,
  lmWarehouseItems: [],
  lmWarehouseLoaded: false
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
  
  if (localPrompts) {
    try {
      state.prompts = JSON.parse(localPrompts);
    } catch (e) {
      console.error("데이터 로드 중 오류 발생. 샘플 데이터로 복원합니다.", e);
      state.prompts = [...DEFAULT_PROMPTS];
      saveData();
    }
  } else {
    try {
      let response = await fetch("prompt_data.json");
      if (!response.ok) {
        response = await fetch("prompts_data.json");
      }
      if (response.ok) {
        state.prompts = await response.json();
        saveData();
      } else {
        state.prompts = [...DEFAULT_PROMPTS];
        saveData();
      }
    } catch (e) {
      try {
        const response = await fetch("prompts_data.json");
        if (response.ok) {
          state.prompts = await response.json();
          saveData();
        } else {
          state.prompts = [...DEFAULT_PROMPTS];
          saveData();
        }
      } catch (err) {
        console.warn("prompt_data.json 로드 실패. 기본 샘플 데이터로 시작합니다.", err);
        state.prompts = [...DEFAULT_PROMPTS];
        saveData();
      }
    }
  }
  
  if (localRecents) {
    try {
      state.recentPromptIds = JSON.parse(localRecents);
    } catch (e) {
      state.recentPromptIds = [];
    }
  }
  
  const localWarehouse = localStorage.getItem("prompt_manager_warehouse_data");
  const warehouseInitialized = localStorage.getItem("prompt_manager_warehouse_initialized");
  if (localWarehouse && warehouseInitialized) {
    try {
      state.warehouseItems = JSON.parse(localWarehouse);
      state.warehouseLoaded = true;
    } catch (e) {
      state.warehouseItems = [];
      state.warehouseLoaded = false;
    }
  } else {
    state.warehouseItems = [];
    state.warehouseLoaded = false;
  }
  
  const localLMWarehouse = localStorage.getItem("prompt_manager_lm_warehouse_data");
  const lmWarehouseInitialized = localStorage.getItem("prompt_manager_lm_warehouse_initialized");
  if (localLMWarehouse && lmWarehouseInitialized) {
    try {
      state.lmWarehouseItems = JSON.parse(localLMWarehouse);
      state.lmWarehouseLoaded = true;
    } catch (e) {
      state.lmWarehouseItems = [];
      state.lmWarehouseLoaded = false;
    }
  } else {
    state.lmWarehouseItems = [];
    state.lmWarehouseLoaded = false;
  }
}

// Ensure warehouse data is loaded from localStorage or server
async function ensureWarehouseLoaded() {
  if (state.warehouseLoaded) return;
  
  const localWarehouse = localStorage.getItem("prompt_manager_warehouse_data");
  const warehouseInitialized = localStorage.getItem("prompt_manager_warehouse_initialized");
  if (localWarehouse && warehouseInitialized) {
    try {
      state.warehouseItems = JSON.parse(localWarehouse);
      state.warehouseLoaded = true;
      return;
    } catch (e) {
      console.error("로컬 창고 데이터 파싱 실패", e);
    }
  }
  
  try {
    showToast("서버에서 창고 데이터를 로드하는 중...", "info", "refresh-cw");
    const response = await fetch("warehouse_data.json");
    if (response.ok) {
      state.warehouseItems = await response.json();
      saveWarehouseData();
      localStorage.setItem("prompt_manager_warehouse_initialized", "true");
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
      state.lmWarehouseItems = JSON.parse(localLMWarehouse);
      state.lmWarehouseLoaded = true;
      return;
    } catch (e) {
      console.error("로컬 LM스타일 창고 데이터 파싱 실패", e);
    }
  }
  
  try {
    showToast("서버에서 LM스타일 창고 데이터를 로드하는 중...", "info", "refresh-cw");
    const response = await fetch("lm_warehouse_data.json");
    if (response.ok) {
      state.lmWarehouseItems = await response.json();
      saveLMWarehouseData();
      localStorage.setItem("prompt_manager_lm_warehouse_initialized", "true");
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

// Save current prompts state to localStorage
function saveData() {
  localStorage.setItem("prompt_manager_data", JSON.stringify(state.prompts));
}

function saveWarehouseData() {
  localStorage.setItem("prompt_manager_warehouse_data", JSON.stringify(state.warehouseItems));
  localStorage.setItem("prompt_manager_warehouse_initialized", "true");
}

function saveLMWarehouseData() {
  localStorage.setItem("prompt_manager_lm_warehouse_data", JSON.stringify(state.lmWarehouseItems));
  localStorage.setItem("prompt_manager_lm_warehouse_initialized", "true");
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
    document.getElementById("lm-warehouse-main-view").classList.add("hidden");
    renderWarehouseGrid();
  } else if (state.currentFilter === "lm-warehouse") {
    document.getElementById("prompts-main-view").classList.add("hidden");
    document.getElementById("warehouse-main-view").classList.add("hidden");
    document.getElementById("lm-warehouse-main-view").classList.remove("hidden");
    renderLMWarehouseGrid();
  } else {
    document.getElementById("prompts-main-view").classList.remove("hidden");
    document.getElementById("warehouse-main-view").classList.add("hidden");
    document.getElementById("lm-warehouse-main-view").classList.add("hidden");
    
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
    
  lucide.createIcons();
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
    return;
  }
  
  emptyState.style.display = "none";
  grid.innerHTML = "";
  
  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "prompt-card";
    card.setAttribute("data-id", p.id);
    
    // Tag string template
    const tagsHtml = (p.tags || []).map(t => `<span class="card-tag-badge">#${t}</span>`).join("");
    
    card.innerHTML = `
      <div class="card-header">
        <div class="card-meta-left">
          <span class="card-category">${p.category || "기타"}</span>
          ${p.recommendedModel ? `<span class="card-model-badge"><i data-lucide="cpu"></i><span>${escapeHtml(p.recommendedModel)}</span></span>` : ""}
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
  
  // Highlight in sidebar UI
  document.querySelectorAll(".nav-menu > li").forEach(li => {
    li.classList.remove("active");
  });
  
  if (filterType === "warehouse") {
    const navWh = document.getElementById("nav-warehouse");
    if (navWh) navWh.classList.add("active");
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
  state.activePromptId = id;
  renderAdminUI();
  
  if (isWarehouse || isLMWarehouse) {
    const item = isLMWarehouse 
      ? state.lmWarehouseItems.find(x => x.id === id)
      : state.warehouseItems.find(x => x.id === id);
    if (!item) return;
    
    document.getElementById("detail-category").textContent = isLMWarehouse ? "LM스타일 창고" : "프롬프트 창고";
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
      modelElement.innerHTML = `<i data-lucide="cpu" class="size-xs"></i><span>${escapeHtml(prompt.recommendedModel)}</span>`;
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
    document.getElementById("form-model").value = prompt.recommendedModel || "";
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
    document.getElementById("form-model").value = sharedState.recommendedModel || "";
    document.getElementById("form-prompt").value = sharedState.promptText || "";
    document.getElementById("form-output").value = sharedState.outputText || "";
  } else {
    // ADD MODE
    document.getElementById("modal-title").textContent = "새 프롬프트 추가";
    document.getElementById("prompt-id").value = "";
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
  const recommendedModel = document.getElementById("form-model").value.trim();
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
function exportData() {
  const dataStr = JSON.stringify(state.prompts, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  const now = new Date();
  const dateStr = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}`;
  
  a.href = url;
  a.download = `PROMPTORIES_백업_${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("데이터 백업 파일이 다운로드되었습니다.", "success", "download");
}

async function exportWarehouseData() {
  await ensureWarehouseLoaded();
  const dataStr = JSON.stringify(state.warehouseItems, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = "warehouse_data.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("창고 데이터가 warehouse_data.json으로 다운로드되었습니다.", "success", "download");
}

async function exportLMWarehouseData() {
  await ensureLMWarehouseLoaded();
  const dataStr = JSON.stringify(state.lmWarehouseItems, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = "lm_warehouse_data.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("LM스타일 창고 데이터가 lm_warehouse_data.json으로 다운로드되었습니다.", "success", "download");
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
      await uploadFileToGitHub("warehouse_data.json", state.warehouseItems);
    } else {
      openGithubConfigModal(async () => {
        if (confirm("새로 저장된 설정으로 동기화를 바로 진행하시겠습니까?")) {
          await uploadFileToGitHub("warehouse_data.json", state.warehouseItems);
        }
      });
    }
  } else {
    openGithubConfigModal(async () => {
      await uploadFileToGitHub("warehouse_data.json", state.warehouseItems);
    });
  }
}

async function syncLMWarehouseToServer() {
  await ensureLMWarehouseLoaded();
  let config = JSON.parse(localStorage.getItem("prompt_manager_github_config"));
  
  if (config && config.owner && config.repo) {
    if (confirm(`GitHub 저장소 (${config.owner}/${config.repo})의 ${config.branch || 'main'} 브랜치에 현재 LM스타일 창고 데이터를 저장하시겠습니까?\n\n[확인]을 누르면 저장이 진행되며, [취소]를 누르면 설정을 변경할 수 있습니다.`)) {
      await uploadFileToGitHub("lm_warehouse_data.json", state.lmWarehouseItems);
    } else {
      openGithubConfigModal(async () => {
        if (confirm("새로 저장된 설정으로 동기화를 바로 진행하시겠습니까?")) {
          await uploadFileToGitHub("lm_warehouse_data.json", state.lmWarehouseItems);
        }
      });
    }
  } else {
    openGithubConfigModal(async () => {
      await uploadFileToGitHub("lm_warehouse_data.json", state.lmWarehouseItems);
    });
  }
}

async function syncPromptsToServer() {
  let config = JSON.parse(localStorage.getItem("prompt_manager_github_config"));
  
  if (config && config.owner && config.repo) {
    if (confirm(`GitHub 저장소 (${config.owner}/${config.repo})의 ${config.branch || 'main'} 브랜치에 현재 전체 프롬프트 데이터를 저장하시겠습니까?\n\n[확인]을 누르면 저장이 진행되며, [취소]를 누르면 설정을 변경할 수 있습니다.`)) {
      await uploadFileToGitHub("prompt_data.json", state.prompts);
    } else {
      openGithubConfigModal(async () => {
        if (confirm("새로 저장된 설정으로 동기화를 바로 진행하시겠습니까?")) {
          await uploadFileToGitHub("prompt_data.json", state.prompts);
        }
      });
    }
  } else {
    openGithubConfigModal(async () => {
      await uploadFileToGitHub("prompt_data.json", state.prompts);
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
    renderApp();
  });
  
  // Search input listeners
  const searchInput = document.getElementById("search-input");
  const searchClear = document.getElementById("search-clear");
  
  searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
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
    searchClear.style.display = "none";
    renderPromptGrid();
    searchInput.focus();
  });
  
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
    renderPromptGrid();
  });
  
  // Empty state reset button
  document.getElementById("btn-reset-search").addEventListener("click", () => {
    searchInput.value = "";
    state.searchQuery = "";
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

  // Create Prompt triggers
  document.getElementById("btn-new-prompt").addEventListener("click", () => {
    if (!state.isAdmin) {
      openEmailAuthModal(() => openModal());
    } else {
      openModal();
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
  
  // Backup / Sync Actions
  document.getElementById("btn-export").addEventListener("click", exportData);
  document.getElementById("btn-sync-prompts").addEventListener("click", syncPromptsToServer);
  
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
    const recommendedModel = document.getElementById("form-model").value.trim();
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
  document.getElementById("btn-github-config-close").addEventListener("click", closeGithubConfigModal);
  document.getElementById("btn-github-config-cancel").addEventListener("click", closeGithubConfigModal);
  document.getElementById("github-config-form").addEventListener("submit", handleSaveGithubConfig);
  document.getElementById("github-config-modal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("github-config-modal")) {
      closeGithubConfigModal();
    }
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
  const btnExport = document.getElementById("btn-export");
  const btnSyncPrompts = document.getElementById("btn-sync-prompts");
  const navWarehouse = document.getElementById("nav-warehouse");
  const navLMWarehouse = document.getElementById("nav-lm-warehouse");
  
  if (!statusBar) return;
  
  if (state.isAdmin) {
    statusBar.classList.add("admin-active");
    statusText.textContent = "관리자 모드";
    lockIcon.setAttribute("data-lucide", "unlock");
    
    // Show admin tools
    if (btnExport) btnExport.style.display = "inline-flex";
    if (btnSyncPrompts) btnSyncPrompts.style.display = "inline-flex";
    if (navWarehouse) navWarehouse.style.display = "block";
    if (navLMWarehouse) navLMWarehouse.style.display = "block";
  } else {
    statusBar.classList.remove("admin-active");
    statusText.textContent = "일반 사용자 모드";
    lockIcon.setAttribute("data-lucide", "lock");
    
    // Hide admin tools
    if (btnExport) btnExport.style.display = "none";
    if (btnSyncPrompts) btnSyncPrompts.style.display = "none";
    if (navWarehouse) {
      navWarehouse.style.display = "none";
      // Fallback to default prompts view if logged out while inside warehouse
      if (state.currentFilter === "warehouse") {
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

function renderWarehouseGrid() {
  const grid = document.getElementById("warehouse-grid");
  const emptyState = document.getElementById("warehouse-empty-state");
  const items = [...state.warehouseItems];
  
  if (items.length === 0) {
    grid.innerHTML = "";
    emptyState.style.display = "flex";
    return;
  }
  
  emptyState.style.display = "none";
  grid.innerHTML = "";
  
  // Sort items desc (newest first)
  items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  items.forEach(item => {
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
      ? `<a href="${item.url}" target="_blank" class="btn btn-secondary btn-xs" style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; font-size: 11px;">
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
    return;
  }
  
  emptyState.style.display = "none";
  grid.innerHTML = "";
  
  // Sort items desc (newest first)
  items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  items.forEach(item => {
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
      ? `<a href="${item.url}" target="_blank" class="btn btn-secondary btn-xs" style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; font-size: 11px;">
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
