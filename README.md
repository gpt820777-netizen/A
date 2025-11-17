# Interactive Geometry Archive

Single-page 실험 아카이빙 사이트입니다. 슬라이더로 연도별 포커스를 추적하고, 필터/카드 인터랙션으로 프로젝트 메모를 바로 확인할 수 있도록 구성했습니다.

## Running the page locally

Because it is a static site, you have two easy options:

1. **Open the file directly**
   - Double-click `index.html` (or open it from your browser's File → Open menu).
   - The browser will load the archive instantly.

2. **Serve it with a local web server** (recommended for testing relative paths)
   - Navigate to this folder in a terminal and run:
     ```bash
     python -m http.server 8000
     ```
   - Visit [http://localhost:8000](http://localhost:8000) in your browser and open `index.html`.

Either approach will display the same interactive archive experience.
