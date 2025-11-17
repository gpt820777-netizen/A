const works = [
  {
    id: "modular",
    title: "Modular Gallery",
    year: 2024,
    category: "web",
    tags: ["WEB", "MOTION"],
    summary: "모듈형 컴포넌트로 관람객이 큐레이션을 재구성할 수 있는 실험.",
    description:
      "반응형 그리드와 커스텀 WebGL 노이즈를 결합해 빛의 파동이 공간을 재구성하도록 만들었습니다.",
    role: "Creative Direction, Front-end Dev",
    tools: "React, Three.js, GSAP",
    link: "https://example.com/modular",
  },
  {
    id: "signal",
    title: "Signal Identity",
    year: 2023,
    category: "identity",
    tags: ["IDENTITY", "FRAMER"],
    summary: "반사되는 삼각형을 이용한 방송 플랫폼의 사운드 시그널 디자인.",
    description:
      "사운드 스펙트럼을 시각화한 데이터에서 패턴을 추출해 로고 시스템을 구축했습니다.",
    role: "Brand System Lead",
    tools: "Framer, After Effects",
    link: "https://example.com/signal",
  },
  {
    id: "orbit",
    title: "Orbit Dashboard",
    year: 2022,
    category: "data",
    tags: ["DATA", "D3"],
    summary: "궤도를 형상화한 데이터 시각화 대시보드.",
    description:
      "조도 센서에서 수집한 정보를 중심점에 매핑하고, 오비트 궤도로 가중치를 표현했습니다.",
    role: "UX + Data Viz",
    tools: "D3.js, Typescript",
    link: "https://example.com/orbit",
  },
  {
    id: "resonance",
    title: "Resonance Field",
    year: 2021,
    category: "installation",
    tags: ["INSTALLATION", "SOUND"],
    summary: "압전 센서를 활용한 몰입형 음향 설치 작품.",
    description:
      "관객의 움직임이 실시간으로 LED 타일을 점등시키고, 음향이 공간을 따라 확산됩니다.",
    role: "Interaction Design",
    tools: "TouchDesigner, Arduino",
    link: "https://example.com/resonance",
  },
  {
    id: "atlas",
    title: "Atlas Notes",
    year: 2020,
    category: "web",
    tags: ["WEB", "STORY"],
    summary: "시차가 느껴지는 에세이를 스크롤로 탐험하는 웹 퍼블리케이션.",
    description:
      "스크롤 위치에 따라 타이포그래피 모듈이 회전하며 도시의 좌표를 그려냅니다.",
    role: "Creative Coding",
    tools: "Svelte, ScrollTrigger",
    link: "https://example.com/atlas",
  },
  {
    id: "fold",
    title: "Folded Signals",
    year: 2019,
    category: "identity",
    tags: ["PRINT", "IDENTITY"],
    summary: "종이 접기 궤적을 기록한 비주얼 아이덴티티 시리즈.",
    description:
      "RGB 채널 분해를 이용한 인쇄 실험으로 디지털과 아날로그의 경계를 흐렸습니다.",
    role: "Art Direction",
    tools: "Illustrator, Risograph",
    link: "https://example.com/fold",
  },
];

const timelineNotes = {
  2018: "스케치와 프로토타이핑에 몰두.",
  2019: "물성과 그래픽을 결합한 인쇄 실험.",
  2020: "원격 협업과 스토리텔링을 위한 웹 퍼블리싱.",
  2021: "설치형 인터랙션과 센서 기반 작업.",
  2022: "데이터 시각화와 대시보드 연구.",
  2023: "브랜드 시스템과 모션 아이덴티티.",
  2024: "네온 조명과 모듈형 인터페이스.",
};

const timelineRange = document.getElementById("timelineRange");
const timelineYear = document.getElementById("timelineYear");
const timelineSummary = document.getElementById("timelineSummary");
const timelineCount = document.getElementById("timelineCount");
const grid = document.getElementById("archiveGrid");
const filterButtons = document.querySelectorAll("[data-filter]");

const detailTitle = document.getElementById("detailTitle");
const detailSummary = document.getElementById("detailSummary");
const detailYear = document.getElementById("detailYear");
const detailTags = document.getElementById("detailTags");
const detailRole = document.getElementById("detailRole");
const detailTools = document.getElementById("detailTools");
const detailLink = document.getElementById("detailLink");

let activeFilter = "all";
let selectedId = null;

function renderGrid() {
  const filtered = works.filter(
    (work) => activeFilter === "all" || work.category === activeFilter
  );

  const template = filtered
    .map(
      (work) => `
        <article class="archive-card" data-id="${work.id}" data-year="${work.year}">
          <div class="archive-card__meta">
            <span>${work.year}</span>
            <span>${work.tags.join(" · ")}</span>
          </div>
          <h3>${work.title}</h3>
          <p>${work.summary}</p>
          <button type="button" class="archive-card__btn" aria-label="${work.title} 자세히 보기">
            열람하기
          </button>
        </article>
      `
    )
    .join("\n");

  grid.innerHTML = template;

  grid.querySelectorAll(".archive-card").forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;
      selectWork(id);
    });
  });

  highlightYear(parseInt(timelineRange.value, 10));
  timelineCount.textContent = `${filtered.length} works`;

  if (filtered.length && !filtered.some((work) => work.id === selectedId)) {
    selectWork(filtered[0].id);
  }
}

function selectWork(id) {
  const work = works.find((item) => item.id === id);
  if (!work) return;

  selectedId = id;
  detailTitle.textContent = work.title;
  detailSummary.textContent = work.description;
  detailYear.textContent = work.year;
  detailTags.textContent = work.tags.join(" · ");
  detailRole.textContent = work.role;
  detailTools.textContent = work.tools;
  detailLink.textContent = "프로젝트 열기";
  detailLink.href = work.link;

  document.querySelectorAll(".archive-card").forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.id === id);
  });
}

function highlightYear(year) {
  const cards = document.querySelectorAll(".archive-card");
  const hasMatch = Array.from(cards).some(
    (card) => parseInt(card.dataset.year, 10) === year
  );

  cards.forEach((card) => {
    const cardYear = parseInt(card.dataset.year, 10);
    const match = cardYear === year;
    card.classList.toggle("is-emphasis", match);
    card.classList.toggle("is-dimmed", hasMatch && !match);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((btn) => btn.classList.remove("is-active"));
    button.classList.add("is-active");
    renderGrid();
  });
});

timelineRange.addEventListener("input", (event) => {
  const year = parseInt(event.target.value, 10);
  timelineYear.textContent = year;
  timelineSummary.textContent = timelineNotes[year] ?? "실험 데이터 정리 중";
  highlightYear(year);
});

renderGrid();
selectWork(works[0].id);
