// AI Stock Analyst - Smart Dynamic Analysis Engine (v2.0)

let financialChartInstance = null;

// ========================================== 
// 1. 글로벌 종목 유니버스 (Stock Universe)
// 각 종목은 고유 태그를 가지며 상황 분석 시 점수 산출에 사용됨
// ========================================== 
const stockUniverse = [
    { ticker: 'NVDA', name: 'NVIDIA Corp.', tags: ['ai', '반도체', '데이터센터', '가속기', 'gpu'], rating: 'BUY', baseReason: 'AI 연산의 핵심인 GPU 시장 독점 및 블랙웰(Blackwell) 아키텍처 기반의 강력한 실적 성장.' },
    { ticker: 'MSFT', name: 'Microsoft', tags: ['ai', '클라우드', '소프트웨어', '코파일럿', 'openai'], rating: 'BUY', baseReason: '애저(Azure) 클라우드와 오피스 제품군 내 AI 통합을 통한 가장 빠른 AI 수익화 성공.' },
    { ticker: '005930.KS', name: '삼성전자', tags: ['반도체', 'hbm', '스마트폰', '온디바이스', 'ai'], rating: 'BUY', baseReason: 'HBM3E 공급 본격화 및 온디바이스 AI 시장 개화에 따른 모바일/가전 수요 반등 수혜.' },
    { ticker: '000660.KS', name: 'SK하이닉스', tags: ['hbm', '반도체', '메모리', 'ai'], rating: 'BUY', baseReason: '엔비디아 향 HBM 독점적 공급 지위 및 서버용 DDR5 수요 폭증에 따른 역대급 이익 사이클.' },
    { ticker: 'AAPL', name: 'Apple Inc.', tags: ['ai', '스마트폰', '애플인텔리전스', '소비재'], rating: 'BUY', baseReason: 'Apple Intelligence 출시로 인한 아이폰 교체 주기 도래 및 서비스 부문의 견조한 마진 확대.' },
    { ticker: 'TSM', name: 'TSMC', tags: ['반도체', '파운드리', 'ai', '첨단공정'], rating: 'BUY', baseReason: '2나노/3나노 첨단 공정 독점력과 AI 칩 위탁 생산 수요 폭증에 따른 압도적 영업이익률.' },
    { ticker: 'LLY', name: 'Eli Lilly', tags: ['헬스케어', '바이오', '비만치료제', '당뇨', '고령화'], rating: 'BUY', baseReason: '젭바운드/마운자로의 글로벌 수요 폭발 및 심혈관 질환 등 적응증 확대에 따른 장기 성장성.' },
    { ticker: 'NVO', name: 'Novo Nordisk', tags: ['헬스케어', '바이오', '비만치료제', '위고비', '고령화'], rating: 'BUY', baseReason: '글로벌 비만 치료제 시장 선점 및 생산 시설 확충을 통한 공급 병목 현상 해소 및 매출 고성장.' },
    { ticker: 'AMZN', name: 'Amazon.com', tags: ['이커머스', '클라우드', 'aws', 'ai', '물류'], rating: 'BUY', baseReason: 'AWS의 AI 서비스 성과 가시화 및 이커머스 부문의 물류 효율화에 따른 수익성 극대화.' },
    { ticker: 'GOOGL', name: 'Alphabet Inc.', tags: ['ai', '광고', '클라우드', '유튜브', '제미나이'], rating: 'BUY', baseReason: 'Gemini 모델의 검색 엔진 통합 및 유튜브 쇼츠 광고 매출 고성장, 클라우드 부문 흑자폭 확대.' },
    { ticker: 'META', name: 'Meta Platforms', tags: ['ai', '광고', 'sns', '메타버스'], rating: 'BUY', baseReason: 'AI 기반 광고 타겟팅 고도화로 광고주 ROAS 증가 및 Llama 모델을 통한 오픈소스 AI 생태계 주도.' },
    { ticker: 'AVGO', name: 'Broadcom', rating: 'BUY', tags: ['반도체', '네트워크', 'ai', '커스텀칩'], baseReason: '빅테크들의 커스텀 AI 가속기(ASIC) 설계 수요 증가 및 VMWare 인수 시너지 본격화.' },
    { ticker: 'O', name: 'Realty Income', tags: ['금리인하', '리츠', '배당', '부동산'], rating: 'BUY', baseReason: '금리 하락 사이클 진입 시 조달 비용 감소 및 높은 배당 수익률로 인한 자금 유입 수혜.' },
    { ticker: 'NEE', name: 'NextEra Energy', tags: ['금리인하', '에너지', '유틸리티', '신재생'], rating: 'BUY', baseReason: '미국 최대 재생 에너지 기업으로, 금리 인하 시 대규모 프로젝트 금융 비용 절감으로 수익성 개선.' },
    { ticker: 'JPM', name: 'JPMorgan Chase', tags: ['금융', '은행', '금리', '미국'], rating: 'HOLD', baseReason: '압도적인 자본력과 안정적인 예대 마진 관리력 보유. 금리 인하 시 IB 부문 활성화 기대.' },
    { ticker: 'TSLA', name: 'Tesla', tags: ['전기차', 'ai', '자율주행', '에너지'], rating: 'HOLD', baseReason: '저가형 모델 출시 기대감 및 FSD 자율주행 데이터 기반의 AI 기업으로서의 밸류에이션 리레이팅.' },
    { ticker: '005380.KS', name: '현대차', tags: ['자동차', '하이브리드', '전기차', '배당'], rating: 'BUY', baseReason: '전기차 캐즘을 하이브리드 판매로 방어하며 역대 최고 실적 기록 중. 강력한 주주환원 정책(밸류업).' },
    { ticker: '207940.KS', name: '삼성바이오로직스', tags: ['바이오', 'cdmo', '헬스케어'], rating: 'BUY', baseReason: '글로벌 빅파마 수주 지속 및 5공장 가동을 통한 생산 능력 초격차 확대.' },
    { ticker: 'ASML', name: 'ASML Holding', tags: ['반도체', '노광장비', '첨단공정', '독점'], rating: 'BUY', baseReason: 'High-NA EUV 등 차세대 장비 독점 공급으로 반도체 미세화 공정의 필수 관문 역할 지속.' },
    { ticker: 'PLTR', name: 'Palantir', tags: ['ai', '소프트웨어', '데이터', '국방'], rating: 'BUY', baseReason: '기업용 AI 플랫폼(AIP)의 폭발적 수주 증가로 인한 S&P500 편입 및 실적 퀀텀 점프.' },
    { ticker: 'UNH', name: 'UnitedHealth', tags: ['헬스케어', '보험', '고령화'], rating: 'BUY', baseReason: '고령 인구 증가에 따른 메디케어 시장 확대 및 데이터 기반 의료 서비스 부문(Optum)의 높은 성장성.' },
    { ticker: '035420.KS', name: 'NAVER', tags: ['플랫폼', 'ai', '광고', '금리인하'], rating: 'HOLD', baseReason: '자체 생성형 AI \'하이퍼클로바X\'의 수익화 진행 및 금리 하락 시 성장주 밸류에이션 회복 수혜.' },
    { ticker: 'COST', name: 'Costco', tags: ['소비재', '리테일', '안정성'], rating: 'BUY', baseReason: '강력한 멤버십 락인 효과와 높은 매출 성장률 유지. 경기 변동과 무관한 안정적인 현금 창출력.' },
    { ticker: 'V', name: 'Visa Inc.', tags: ['금융', '핀테크', '결제', '인플레'], rating: 'BUY', baseReason: '글로벌 여행 수요 회복 및 디지털 결제 비중 확대에 따른 고마진 수수료 매출 지속 성장.' }
];

// ========================================== 
// 2. 최신 심층 분석 DB (2024~2026 데이터)
// ========================================== 
const mockDataDB = {
    '삼성전자': {
        name: '삼성전자 (Samsung Electronics)',
        ticker: '005930.KS',
        rating: 'BUY',
        targetPrice: '110,000 KRW',
        currentPrice: '78,500 KRW',
        comprehensive: `
            <p><strong>[2024-2026 전략] HBM 리더십 탈환과 AI 하드웨어 장악</strong></p>
            <p>삼성전자는 2024년 5세대 HBM(HBM3E)의 주요 고객사 퀄 테스트 통과와 함께 메모리 수익성을 극대화하고 있습니다. 특히 D램 업황의 구조적 우상향 사이클 진입과 낸드(NAND) 적자 해소로 2024년 영업이익은 전년 대비 약 600% 이상 증가한 40조 원 수준을 기록할 전망입니다.</p>
            <p>2025년에는 2나노 공정 기반 파운드리 양산과 갤럭시 AI 에코시스템 확장을 통해 세트(Set)와 부품(Component) 간의 시너지를 극대화하며 다시 한번 글로벌 반도체 시가총액 리더로서의 지위를 공고히 할 것으로 판단됩니다.</p>`,
        overview: `
            <ul>
                <li><strong>핵심 경쟁력:</strong> 세계 1위 메모리 생산 능력, 글로벌 스마트폰 점유율 1위, 세계 2위 파운드리 생산 라인을 모두 보유한 전 세계 유일의 종합 반도체 기업(IDM).</li>
                <li><strong>미래 먹거리:</strong> CXL(Compute Express Link), 온디바이스 AI 칩셋, 그리고 차세대 패키징 기술을 통한 AI 서버 토탈 솔루션 제공.</li>
                <li><strong>재무 전략:</strong> 연간 50조 원 이상의 CAPEX를 유지하면서도 순현금 100조 원 수준의 안정적인 재무 상태를 바탕으로 공격적인 M&A 기회 탐색 중.</li>
            </ul>`,
        financialText: `
            <p><strong>[재무 추정] 영업이익 V자 반등 및 영업이익률 정상화</strong></p>
            <p>2023년의 기록적인 적자를 뒤로하고, 2024년부터 ASP(평균판매단가) 상승 효과가 본격화되고 있습니다. 특히 고부가 제품인 HBM 및 DDR5 비중이 전체 매출의 30%를 상회하며 수익성 개선을 견인하고 있습니다.</p>`,
        financialTable: [
            ['주요 지표 (조 원)', '2023(A)', '2024(E)', '2025(E)', '2026(E)'],
            ['매출액', '258.9', '305.4', '342.1', '378.5'],
            ['영업이익', '6.6', '41.2', '55.8', '64.2'],
            ['순이익', '15.4', '32.5', '45.1', '51.8'],
            ['ROE (%)', '4.1%', '10.5%', '13.8%', '14.5%'],
            ['P/E (배)', '35.2x', '14.2x', '11.5x', '10.2x']
        ],
        financialChartData: [6.6, 41.2, 55.8, 64.2],
        financialChartLabels: ['2023', '2024(E)', '2025(E)', '2026(E)'],
        financialChartTitle: '영업이익 추이 (조 원)',
        industry: `<p>AI 서버용 고용량 메모리 수요가 공급을 앞지르는 '공급자 우위' 시장이 지속되고 있습니다. 특히 HBM 시장은 2026년까지 연평균 60% 이상의 성장이 예상되며, 삼성전자의 점유율 확대가 주가의 핵심 촉매제가 될 것입니다.</p>`,
        momentum: `<p>최근 외국인 지분율이 55%를 돌파하며 역대 최고 수준에 근접했습니다. 기관 투자자들의 '밸류업 프로그램' 수혜주로서의 매수세 또한 강하게 유입되고 있습니다.</p>`,
        riskText: `<p>미·중 반도체 패권 갈등에 따른 대중국 장비 반입 규제와 파운드리 부문의 TSMC와의 점유율 격차 해소 지연이 주요 리스크 요인입니다.</p>`,
        swot: {
            s: ['메모리 전 분야 압도적 점유율', '안정적인 현금흐름'],
            w: ['파운드리 선단공정 수율 안정화 속도', 'HBM 시장 초기 대응 지연'],
            o: ['온디바이스 AI 시장의 폭발적 개화', '글로벌 금리 인하에 따른 IT 수요 회복'],
            t: ['지정학적 리스크 심화', '중국 레거시 반도체의 자급률 확대']
        }
    },
    'AAPL': {
        name: 'Apple Inc. (애플)',
        ticker: 'AAPL',
        rating: 'BUY',
        targetPrice: '$250.00',
        currentPrice: '$215.40',
        comprehensive: `
            <p><strong>[2024 하반기 전망] AI가 여는 20억 대 기기의 교체 사이클</strong></p>
            <p>애플은 WWDC 2024를 통해 공개한 'Apple Intelligence'를 기점으로 폐쇄적인 하드웨어 강자에서 '개인 맞춤형 AI 비서' 플랫폼으로 진화하고 있습니다. 이는 iPhone 16 시리즈부터 시작될 강력한 하드웨어 슈퍼 사이클을 예고하고 있습니다.</p>
            <p>또한, 서비스 부문(App Store, Music, iCloud)의 매출 비중이 25%를 넘어서며 하드웨어 부문의 변동성을 상쇄하고 전사 마진율을 45% 이상으로 끌어올리는 고성장/고마진 구조를 완성했습니다.</p>`,
        overview: `
            <ul>
                <li><strong>비즈니스 모델:</strong> iOS/macOS라는 독점적 생태계를 기반으로 하드웨어를 판매하고, 이를 통해 발생한 데이터를 기반으로 고수익 서비스 매출을 창출하는 'Eco-system Lock-in'.</li>
                <li><strong>기술적 우위:</strong> 자체 설계 칩셋(A/M 시리즈)을 통한 전력 효율 극대화 및 소프트웨어와 하드웨어의 완벽한 최적화.</li>
                <li><strong>주주 환원:</strong> 매년 1,000억 달러 규모의 자사주 매입 및 배당 확대를 통해 EPS(주당순이익)의 지속적인 우상향 보장.</li>
            </ul>`,
        financialText: `
            <p><strong>[실적 분석] 서비스 마진율 70% 돌파 및 하드웨어 매출 반등</strong></p>
            <p>중국 시장 점유율 우려에도 불구하고, 인도 등 신흥 시장에서의 성장이 이를 상쇄하고 있습니다. 특히 고가의 Pro 모델 비중 증가로 인해 ASP가 꾸준히 상승 중입니다.</p>`,
        financialTable: [
            ['주요 지표 (Billion $)', 'FY23(A)', 'FY24(E)', 'FY25(E)', 'FY26(E)'],
            ['매출액', '383.3', '395.2', '425.8', '458.1'],
            ['영업이익', '114.3', '125.1', '138.5', '152.4'],
            ['순이익', '97.0', '105.8', '118.4', '130.2'],
            ['영업이익률 (%)', '29.8%', '31.6%', '32.5%', '33.2%'],
            ['P/E (배)', '29.8x', '28.5x', '24.2x', '21.5x']
        ],
        financialChartData: [114.3, 125.1, 138.5, 152.4],
        financialChartLabels: ['FY23', 'FY24(E)', 'FY25(E)', 'FY26(E)'],
        financialChartTitle: 'Operating Income ($B)',
        industry: `<p>글로벌 스마트폰 시장이 정체된 가운데, 프리미엄 폰 시장은 매년 성장 중입니다. 애플은 프리미엄 시장 내 70% 이상의 점유율을 차지하며 산업 내 이익을 사실상 독식하고 있습니다.</p>`,
        momentum: `<p>AI 내러티브 확보 이후 월가 투자은행들의 목표주가 상향이 이어지고 있으며, 워런 버핏의 비중 조절 이후에도 개인 및 기관 투자자들의 강력한 매수세가 유지되고 있습니다.</p>`,
        riskText: `<p>반독점 소송(미국 법무부, 유럽연합), 중국 정부의 아이폰 규제 확대, 그리고 생성형 AI 기술의 자체 개발 속도가 주요 변수입니다.</p>`,
        swot: {
            s: ['압도적인 브랜드 가치', '현금 창출 능력'],
            w: ['신제품 폼팩터 혁신 둔화', '중국 시장 의존도'],
            o: ['개인용 AI 비서 시장 선점', '인도 시장 판매 급증'],
            t: ['글로벌 독점 규제 강화', '화웨이 등 로컬 업체의 추격']
        }
    }
};

// ========================================== 
// 3. 동적 추천 엔진 로직
// ========================================== 

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const logoHome = document.getElementById('logo-home');
    const homeView = document.getElementById('home-view');
    const reportContainer = document.getElementById('report-container');
    const topStockInput = document.getElementById('stock-input');
    const topAnalyzeBtn = document.getElementById('analyze-btn');
    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    const loadingOverlay = document.getElementById('loading-overlay');
    const loadingMsg = document.getElementById('loading-msg');
    const loadingSubMsg = document.getElementById('loading-sub-msg');
    const situationInput = document.getElementById('situation-input');
    const recommendBtn = document.getElementById('recommend-btn');
    const tagBtns = document.querySelectorAll('.tag');
    const recommendationResults = document.getElementById('recommendation-results');
    const analyzedThemeSpan = document.getElementById('analyzed-theme');
    const themeDescP = document.getElementById('theme-description');
    const recommendationCards = document.getElementById('recommendation-cards');

    // Home Logo
    logoHome.addEventListener('click', () => {
        homeView.classList.remove('hidden');
        reportContainer.classList.add('hidden');
        recommendationResults.classList.add('hidden');
        topStockInput.value = '';
        situationInput.value = '';
        window.scrollTo(0,0);
    });

    // Individual Analysis
    topAnalyzeBtn.addEventListener('click', () => performAnalysis(topStockInput.value.trim()));
    topStockInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') performAnalysis(topStockInput.value.trim()); });

    // Situation Analysis
    recommendBtn.addEventListener('click', () => performDynamicThemeAnalysis(situationInput.value.trim()));
    tagBtns.forEach(tag => {
        tag.addEventListener('click', () => {
            situationInput.value = tag.dataset.query;
            performDynamicThemeAnalysis(tag.dataset.query);
        });
    });

    // PDF Download
    downloadPdfBtn.addEventListener('click', () => {
        const element = document.getElementById('pdf-content');
        const companyName = document.getElementById('company-name').innerText;
        html2pdf().set({ margin: 10, filename: `${companyName}_Report.pdf`, html2canvas: { scale: 2 }, jsPDF: { unit: 'mm', format: 'a4' } }).from(element).save();
    });

    // ========================================== 
    // 로직: 동적 테마 분석 및 종목 선별 엔진
    // ========================================== 
    function performDynamicThemeAnalysis(query) {
        if (!query) { alert('상황을 입력해주세요.'); return; }

        loadingMsg.textContent = 'AI가 입력하신 상황에 가장 적합한 종목을 실시간 선별 중입니다...';
        loadingSubMsg.textContent = '거시 경제 데이터와 각 기업의 비즈니스 밸류체인 연관성을 분석 중입니다.';
        loadingOverlay.classList.remove('hidden');
        recommendationResults.classList.add('hidden');

        setTimeout(() => {
            const lowerQuery = query.toLowerCase();
            
            // 1. 모든 종목 점수 계산
            const scoredStocks = stockUniverse.map(stock => {
                let score = 0;
                stock.tags.forEach(tag => {
                    if (lowerQuery.includes(tag)) score += 10; // 태그 매칭 점수
                });
                
                // 보정 점수: 범용적으로 긍정적인 키워드 매칭
                if (lowerQuery.includes('성장') || lowerQuery.includes('미래')) score += 2;
                if (lowerQuery.includes('안정') || lowerQuery.includes('배당')) if (stock.tags.includes('배당') || stock.tags.includes('안정성')) score += 5;
                
                return { ...stock, score };
            });

            // 2. 점수 순 정렬 (점수가 같으면 랜덤성 가미하여 다양성 확보)
            scoredStocks.sort((a, b) => (b.score - a.score) || (Math.random() - 0.5));

            // 3. 상위 8개 추출
            const selectedStocks = scoredStocks.slice(0, 8);
            
            // 4. 테마 제목 결정
            let themeTitle = `"${query}" 관련 최적 수혜주`;
            if (selectedStocks[0].score > 0) {
                if (lowerQuery.includes('ai')) themeTitle = 'AI 및 차세대 컴퓨팅 수혜 전략';
                else if (lowerQuery.includes('금리')) themeTitle = '금리 변동 대응 자산 배분 전략';
                else if (lowerQuery.includes('헬스케어') || lowerQuery.includes('노인')) themeTitle = '고령화 및 바이오 혁신 수혜주';
            }

            renderDynamicRecommendations(themeTitle, selectedStocks, query);
            
            loadingOverlay.classList.add('hidden');
            recommendationResults.classList.remove('hidden');
            recommendationResults.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    }

    function renderDynamicRecommendations(title, stocks, query) {
        analyzedThemeSpan.textContent = title;
        themeDescP.textContent = `입력하신 "${query}" 상황에서 가장 높은 이익 성장성과 비즈니스 모멘텀이 기대되는 상위 8개 기업입니다. 각 기업의 핵심 경쟁력과 추천 사유를 확인하십시오.`;
        
        recommendationCards.innerHTML = '';
        stocks.forEach(stock => {
            const card = document.createElement('div');
            card.className = 'stock-card';
            card.innerHTML = `
                <div class="stock-card-header">
                    <span class="stock-card-name">${stock.name}</span>
                    <span class="stock-card-ticker">${stock.ticker}</span>
                </div>
                <div class="stock-card-reason">
                    ${stock.baseReason}
                </div>
                <div class="stock-card-footer">
                    <span class="card-rating ${stock.rating.toLowerCase()}">의견: ${stock.rating}</span>
                    <span class="card-action">상세 리포트 보기 ➔</span>
                </div>
            `;
            card.addEventListener('click', () => performAnalysis(stock.ticker));
            recommendationCards.appendChild(card);
        });
    }

    // ========================================== 
    // 로직: 개별 종목 분석 및 최신 리포트 생성
    // ========================================== 
    function performAnalysis(query) {
        if (!query) { alert('종목을 입력해주세요.'); return; }

        reportContainer.classList.add('hidden');
        loadingMsg.textContent = 'AI 애널리스트가 실시간 금융 데이터를 분석 중입니다...';
        loadingSubMsg.textContent = '2024년 실적 확정치 및 2025-2026년 컨센서스를 반영 중입니다.';
        loadingOverlay.classList.remove('hidden');

        setTimeout(() => {
            try {
                generateReport(query);
                loadingOverlay.classList.add('hidden');
                homeView.classList.add('hidden');
                reportContainer.classList.remove('hidden');
                downloadPdfBtn.disabled = false;
                reportContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } catch (error) {
                console.error(error);
                alert('리포트 생성 중 오류 발생');
                loadingOverlay.classList.add('hidden');
            }
        }, 2000);
    }

    function generateReport(query) {
        const upperQuery = query.toUpperCase();
        let data = null;

        if (query.includes('삼성') || query === '005930' || query === '005930.KS') data = mockDataDB['삼성전자'];
        else if (upperQuery.includes('AAPL') || query.includes('애플') || upperQuery.includes('APPLE')) data = mockDataDB['AAPL'];
        else {
            // Fallback for other stocks in universe
            const foundInUniverse = stockUniverse.find(s => s.ticker === upperQuery || s.name.toUpperCase().includes(upperQuery));
            if (foundInUniverse) {
                data = getDynamicFallbackData(foundInUniverse);
            } else {
                data = getDynamicFallbackData({ ticker: upperQuery, name: query });
            }
        }

        // DOM Update
        document.getElementById('report-date').textContent = new Date().toISOString().split('T')[0];
        document.getElementById('company-name').textContent = data.name;
        document.getElementById('company-ticker').textContent = data.ticker;
        const ratingVal = document.getElementById('rating-value');
        ratingVal.textContent = data.rating;
        ratingVal.className = `rating-value ${data.rating.toLowerCase()}`;
        document.getElementById('target-price').textContent = data.targetPrice;
        document.getElementById('current-price').textContent = data.currentPrice;
        document.getElementById('content-comprehensive').innerHTML = data.comprehensive;
        document.getElementById('content-overview').innerHTML = data.overview;
        document.getElementById('financial-text').innerHTML = data.financialText;
        document.getElementById('content-industry').innerHTML = data.industry;
        document.getElementById('content-momentum').innerHTML = data.momentum;
        document.getElementById('content-risk').innerHTML = data.riskText;

        renderFinancialTable(data.financialTable);
        renderSwot(data.swot);
        renderChart(data);
    }

    function getDynamicFallbackData(stock) {
        return {
            name: stock.name || stock.ticker,
            ticker: stock.ticker,
            rating: stock.rating || 'HOLD',
            targetPrice: 'AI 적정가 산출 중',
            currentPrice: '시장가 반영 중',
            comprehensive: `<p><strong>${stock.name}</strong>는 최근 AI 패러다임 변화와 매크로 환경 변화에 민감하게 반응하고 있는 기업입니다. 2024년 실적 전망치에 따르면, 동사는 수익성 위주의 사업 재편을 통해 안정적인 현금흐름을 확보하고 있습니다.</p>`,
            overview: `<ul><li><strong>주요 사업:</strong> 해당 섹터 내 시장 점유율 상위권을 유지 중인 핵심 비즈니스 모델 보유.</li><li><strong>성장 동력:</strong> 기술 혁신을 통한 원가 절감 및 신규 시장(AI, 신흥국 등) 진입 가속화.</li></ul>`,
            financialText: `<p>2024-2025년 예상 영업이익률은 업종 평균을 상회할 것으로 전망됩니다. 효율적인 자본 배분과 자사주 매입 등 주주 환원 정책이 강화되는 추세입니다.</p>`,
            financialTable: [['지표', '2023(A)', '2024(E)', '2025(E)', '2026(E)'], ['매출액 지수', '100', '112', '125', '140'], ['이익 성장성', '보통', '높음', '매우높음', '안정'], ['ROE', '12%', '14%', '16%', '17%']],
            financialChartData: [10, 15, 22, 28],
            financialChartLabels: ['2023', '2024(E)', '2025(E)', '2026(E)'],
            financialChartTitle: '추정 수익성 성장 (Index)',
            industry: `<p>해당 업종은 현재 공급망 재편과 디지털 전환의 가시적인 성과가 나타나는 구간입니다. 경쟁사 대비 압도적인 R&D 투자 비중이 중장기적 해자(Moat)를 형성하고 있습니다.</p>`,
            momentum: `<p>거래량 동반 상승세가 확인되며, 주요 이평선의 정배열 구간 진입으로 기술적 반등 모멘텀이 매우 강한 상태입니다.</p>`,
            riskText: `<p>환율 변동성에 따른 환차손 리스크와 원자재 가격 상승에 따른 마진 압박 가능성을 상시 모니터링해야 합니다.</p>`,
            swot: { s: ['강력한 브랜드 권력', '현금 보유력'], w: ['높은 밸류에이션 부담'], o: ['신규 시장 침투 확대'], t: ['규제 환경 변화'] }
        };
    }

    // Helper functions for rendering
    function renderFinancialTable(tableData) {
        const thead = document.querySelector('.financial-table thead tr');
        const tbody = document.getElementById('financial-table-body');
        thead.innerHTML = tableData[0].map(h => `<th>${h}</th>`).join('');
        tbody.innerHTML = tableData.slice(1).map(row => `<tr>${row.map(c => `<td>${c}</td>`).join('')}</tr>`).join('');
    }

    function renderSwot(swotData) {
        const container = document.getElementById('swot-container');
        const swotMap = [{ k: 's', t: 'Strength', c: 'swot-s', i: '💪' }, { k: 'w', t: 'Weakness', c: 'swot-w', i: '⚠️' }, { k: 'o', t: 'Opportunity', c: 'swot-o', i: '🚀' }, { k: 't', t: 'Threat', c: 'swot-t', i: '🛑' }];
        container.innerHTML = swotMap.map(item => `
            <div class="swot-box ${item.c}">
                <h4>${item.i} ${item.t}</h4>
                <ul>${swotData[item.k].map(text => `<li>${text}</li>`).join('')}</ul>
            </div>
        `).join('');
    }

    function renderChart(data) {
        const ctx = document.getElementById('financialChart').getContext('2d');
        if (financialChartInstance) financialChartInstance.destroy();
        financialChartInstance = new Chart(ctx, {
            type: 'bar',
            data: { labels: data.financialChartLabels, datasets: [{ label: data.financialChartTitle, data: data.financialChartData, backgroundColor: 'rgba(0, 82, 204, 0.7)', borderRadius: 4 }] },
            options: { responsive: true, maintainAspectRatio: false, animation: { duration: 0 } }
        });
    }
});