// AI Stock Analyst - Mock Data & Logic

// 차트 객체 전역 보관
let financialChartInstance = null;

// 가상의 기업 리포트 DB (애널리스트 수준의 상세 분석 데이터)
const mockDataDB = {
    '삼성전자': {
        name: '삼성전자 (Samsung Electronics)',
        ticker: '005930.KS',
        rating: 'BUY',
        targetPrice: '95,000 KRW',
        currentPrice: '73,000 KRW',
        comprehensive: `
            <p><strong>반도체 턴어라운드와 온디바이스 AI 수혜의 교차점</strong></p>
            <p>메모리 반도체 감산 효과가 본격화되며 D램과 낸드의 ASP(평균판매단가) 상승이 가파르게 진행되고 있습니다. 더불어 차기 플래그십 모델을 필두로 한 '온디바이스 AI' 시장 개화는 모바일 기기 교체 주기를 앞당겨 동사의 MX(모바일경험) 사업부 실적 방어에 기여하고 있습니다.</p>
            <p>HBM(고대역폭메모리) 시장에서의 점유율 확대가 다소 지연된 점은 아쉬우나, 차세대 HBM3E 양산 본격화 및 주요 고객사 향 퀄테스트 통과 시 밸류에이션 디스카운트는 빠르게 해소될 전망입니다. 2025년까지 구조적 이익 성장이 기대되므로 현 주가 수준에서 적극적인 매수 관점을 권고합니다.</p>
        `,
        overview: `
            <ul>
                <li><strong>핵심 사업 부문:</strong> DS(반도체, 메모리/파운드리), DX(스마트폰, 가전, 네트워크), SDC(디스플레이), Harman(전장부품).</li>
                <li><strong>시장 지위:</strong> D램 및 낸드플래시 글로벌 점유율 1위, 스마트폰 출하량 글로벌 1위의 초격차 리딩 기업.</li>
                <li><strong>경영진 및 비전:</strong> '세상에 없는 기술'을 모토로 미래 기술(AI, 6G, 로봇) R&D 투자를 지속하고 있으며, 주주환원 강화를 위한 배당 정책을 적극적으로 실시 중.</li>
            </ul>
        `,
        financial: `
            <p><strong>실적 턴어라운드 가속화 및 FCF 회복</strong></p>
            <p>과거 메모리 업황 부진으로 실적 저점을 통과했으나, 최근 빠른 회복세를 보이고 있습니다. 감산으로 인한 재고 건전화와 주요 고객사들의 재고 축적(Restocking) 수요가 맞물려 DS 부문 흑자 전환이 예상보다 빠르게 진행되었습니다.</p>
            <p>전사 연간 영업이익은 전년 대비 폭발적으로 증가할 것으로 추정되며, CAPEX(설비투자)는 첨단 공정 위주로 효율화하여 잉여현금흐름(FCF)이 크게 개선될 것입니다. 압도적인 순현금 체력을 바탕으로 M&A 및 주주환원 정책 확대 기대감도 유효합니다.</p>
        `,
        financialChartData: [6.5, 4.3, 38.5, 48.2], // Example op profit (Trillion KRW)
        financialChartLabels: ['2022', '2023', '2024(E)', '2025(E)'],
        financialChartTitle: '연간 영업이익 추이 (단위: 조 원)',
        industry: `
            <p><strong>AI가 이끄는 슈퍼 사이클의 초입</strong></p>
            <p><strong>1. 메모리 반도체:</strong> AI 서버 수요 폭증으로 HBM(고대역폭메모리) 및 고용량 DDR5 모듈 수요가 구조적으로 성장 중입니다. 일반 서버 및 PC/모바일 수요도 점진적 회복세를 보이고 있어 타이트한 수급 환경이 지속될 전망입니다.</p>
            <p><strong>2. 스마트폰 (온디바이스 AI):</strong> 하드웨어 스펙 경쟁을 넘어 AI 기능 탑재가 프리미엄 스마트폰의 핵심 셀링 포인트로 자리잡고 있습니다. 이는 기기당 메모리 탑재량(Content per box) 증가를 야기하여 동사의 DS 및 MX 사업부 모두에 긍정적인 선순환 고리를 만듭니다.</p>
        `,
        momentum: `
            <p><strong>외국인 수급 유입 및 밸류에이션 매력</strong></p>
            <p>과거 PBR 1.1배~1.2배 수준은 강력한 하방 지지선으로 작용해왔으며, 현재 주가는 역사적 밴드 하단 부근에 위치해 밸류에이션 매력이 매우 높습니다. 최근 엔비디아 향 HBM 공급 기대감이 재점화되며 외국인 투자자들의 매수세가 강하게 유입되고 있습니다.</p>
            <p>차트 상 단기 저항선을 대량 거래를 동반하여 돌파할 경우, 추가적인 상승 모멘텀이 크게 강화될 것으로 기술적 분석은 지시합니다.</p>
        `,
        risk: `
            <ul>
                <li><strong>선단 공정 경쟁 격화:</strong> 파운드리 부문에서 대만 TSMC와의 점유율 격차 축소가 지연되고 있으며, 수주 부진 시 파운드리 적자가 전사 이익률을 훼손할 수 있습니다.</li>
                <li><strong>매크로 불확실성:</strong> 글로벌 경기 회복세 둔화 또는 지정학적 리스크 심화 시, IT 세트(스마트폰, PC, TV) 수요 회복이 지연될 가능성이 상존합니다.</li>
                <li><strong>환율 변동성:</strong> 원/달러 환율 하락(원화 강세) 전환 시 수출 위주의 동사 실적(환차익)에 일부 부정적 영향이 발생할 수 있습니다.</li>
            </ul>
        `
    },
    'AAPL': {
        name: 'Apple Inc. (애플)',
        ticker: 'AAPL',
        rating: 'BUY',
        targetPrice: '$210.00',
        currentPrice: '$178.50',
        comprehensive: `
            <p><strong>서비스 수익 모델 고도화와 'Apple Intelligence' 생태계 확장</strong></p>
            <p>애플은 단순한 하드웨어 제조사를 넘어 20억 개 이상의 활성 기기(Active Devices)를 기반으로 한 거대한 플랫폼 기업으로 진화했습니다. 서비스 부문(App Store, Apple Music, iCloud 등)의 매출 비중과 이익률이 지속 증가하며 전사 실적의 안정성을 극대화하고 있습니다.</p>
            <p>최근 'Apple Intelligence' 발표를 통해 그간 약점으로 지적받던 AI 분야에서의 명확한 청사진을 제시했습니다. 막강한 자체 실리콘(칩셋) 역량과 개인정보 보호를 강점으로 한 '온디바이스 AI' 생태계 구축은 기존 유저들의 락인(Lock-in) 효과를 강화하고, 지연되었던 기기 교체 주기를 강력하게 자극할 것입니다.</p>
        `,
        overview: `
            <ul>
                <li><strong>핵심 사업 부문:</strong> 하드웨어(iPhone, Mac, iPad, Wearables), 서비스(App Store, Apple Pay, Apple TV+).</li>
                <li><strong>시장 지위:</strong> 글로벌 프리미엄 스마트폰 시장 압도적 1위, 독자적인 iOS/macOS 생태계 구축.</li>
                <li><strong>핵심 경쟁력:</strong> 탁월한 브랜드 로열티, 하드웨어와 소프트웨어의 완벽한 통합 역량, 강력한 잉여현금흐름(FCF).</li>
            </ul>
        `,
        financial: `
            <p><strong>강력한 현금창출능력과 주주환원의 정석</strong></p>
            <p>하드웨어 매출 성장이 성숙기에 진입했으나, 서비스 부문(매출총이익률 70% 이상)의 꾸준한 두 자릿수 성장이 전사 마진을 견인하고 있습니다. 2024년 및 2025년 영업이익률은 30%를 안정적으로 상회할 것으로 전망됩니다.</p>
            <p>압도적인 영업활동현금흐름(Operating Cash Flow)을 바탕으로 매년 대규모 자사주 매입(Share Buybacks)과 배당금 인상을 실행하고 있으며, 이는 주식 수 감소를 통한 주당순이익(EPS) 성장의 핵심 동력입니다.</p>
        `,
        financialChartData: [114.2, 119.4, 122.5, 130.8], // Example op profit (Billion USD)
        financialChartLabels: ['FY22', 'FY23', 'FY24(E)', 'FY25(E)'],
        financialChartTitle: 'Operating Income (Unit: Billion USD)',
        industry: `
            <p><strong>프리미엄 스마트폰 시장의 견조함과 'AI 폰' 사이클</strong></p>
            <p>글로벌 스마트폰 출하량의 전체적 성장은 정체되었으나, ASP(평균판매단가)가 높은 프리미엄 및 초프리미엄 모델의 수요는 견고합니다. 애플은 이 고가 시장에서 70% 이상의 점유율을 차지하며 이익을 독식하고 있습니다.</p>
            <p>향후 스마트폰 시장은 단순 스펙 경쟁을 넘어 AI 기능 구동을 위한 최적화가 중요해지는 'AI 폰' 교체 사이클로 진입하고 있습니다. 애플이 자체 설계한 A-시리즈 및 M-시리즈 실리콘의 전력 효율성과 NPU 성능은 타사 대비 확실한 우위를 제공합니다.</p>
        `,
        momentum: `
            <p><strong>AI 혁신 기대감 선반영 구간, 장기 우상향 추세 유효</strong></p>
            <p>AI 경쟁력에 대한 시장의 의구심으로 한때 주가 조정을 겪었으나, 세계개발자회의(WWDC) 이후 패러다임 전환 기대감이 반영되며 강한 랠리를 시현했습니다.</p>
            <p>기술적 지표상 단기 과매수(Overbought) 구간에 진입했을 수 있으나, 하반기 AI 기능이 최적화된 신제품(iPhone 16 등) 출시에 따른 '슈퍼 사이클' 기대감이 주가의 하방 경직성을 제공하며 중장기 상승 추세선을 이어갈 것입니다.</p>
        `,
        risk: `
            <ul>
                <li><strong>중국 시장 내 경쟁 심화:</strong> 화웨이 등 현지 업체의 부상 및 지정학적 갈등(애국 소비 현상)으로 인해 핵심 매출처인 중국(Greater China) 지역의 실적 부진 리스크.</li>
                <li><strong>반독점 규제(Antitrust Risk):</strong> 미국 법무부(DOJ) 소송 및 유럽연합(EU) 디지털시장법(DMA) 시행에 따른 App Store 수수료 체계 강제 변경 압력.</li>
                <li><strong>신성장 동력(Next Big Thing) 부재 우려:</strong> Vision Pro(공간 컴퓨터)의 초기 시장 침투 지연 및 자율주행차(Project Titan) 폐기로 인한 차세대 메가 성장 동력에 대한 시장의 의문.</li>
            </ul>
        `
    }
};

// 동적 데이터 생성 (DB에 없는 종목용 템플릿)
const getFallbackData = (query) => {
    const uppercaseQuery = query.toUpperCase();
    return {
        name: `${uppercaseQuery} Corp.`,
        ticker: uppercaseQuery,
        rating: 'HOLD',
        targetPrice: '분석 중',
        currentPrice: '데이터 없음',
        comprehensive: `<p><strong>${uppercaseQuery}</strong>에 대한 상세 애널리스트 리포트 데이터 수집 및 분석이 진행 중입니다. 현재 시스템은 주요 대형주 및 트렌드 주도주에 분석 역량이 집중되어 있습니다.</p><p>동사는 속한 산업군 내에서 일정 수준의 시장 점유율을 유지하고 있으나, 최근 매크로 환경 변화(금리, 환율)에 대한 민감도가 높아 단기적으로 시장 평균 수준의 성과를 보일 것으로 예상됩니다. 펀더멘털 개선 여부에 대한 추가적인 모니터링이 필요합니다.</p>`,
        overview: `<ul><li><strong>분석 대상:</strong> ${uppercaseQuery}</li><li>시스템에서 기업 공시 데이터(10-K, 분기보고서 등) 및 최신 뉴스 플로우를 파싱하고 있습니다.</li><li>상세 사업 부문과 지배구조 정보는 추후 업데이트될 예정입니다.</li></ul>`,
        financial: `<p>재무제표 원본 데이터를 추출 및 정제하는 중입니다. 현재 추정 PER, PBR, ROE 등의 가치평가(Valuation) 지표 제공이 일시적으로 제한됩니다.</p><p>최근 3개년 매출액 및 영업이익 추이는 업종 평균 수준을 기록하고 있는 것으로 추정되나, 향후 원가 절감 또는 신규 매출처 확보가 마진율 개선의 핵심 키가 될 것입니다.</p>`,
        financialChartData: [100, 105, 112, 108],
        financialChartLabels: ['T-3', 'T-2', 'T-1', 'Current'],
        financialChartTitle: '매출 추이 지수 (Base=100)',
        industry: `<p>${uppercaseQuery}가 속한 산업군은 현재 구조적인 변화(디지털 전환, 친환경 규제, 공급망 재편 등)를 겪고 있습니다.</p><p>원자재 가격 변동성 확대 및 경쟁 심화가 기업들의 마진율 압박 요인으로 작용하고 있으며, 상위 업체로의 점유율 집중(Consolidation) 현상이 향후 가속화될 가능성이 있습니다.</p>`,
        momentum: `<p>최근 주가 흐름은 벤치마크 지수 대비 중립적인 움직임을 보이고 있습니다. 뚜렷한 주도 매수 주체(외국인/기관)의 연속적인 유입은 관찰되지 않고 있습니다.</p><p>기술적 분석상 주요 이동평균선(60일, 120일) 부근에서 공방이 벌어지고 있으며, 단기 방향성을 결정지을 촉매제(Catalyst)가 부재한 상황입니다.</p>`,
        risk: `<ul><li><strong>정보 비대칭 리스크:</strong> 당사 AI 시스템 내 객관적인 컨센서스 데이터 및 IR 자료 부족.</li><li><strong>매크로 민감도:</strong> 고금리 기조 장기화 또는 경기 침체 우려 시 실적 추정치 하향 조정 가능성.</li><li><strong>수급 불균형:</strong> 거래대금 부족 시 기관 투자자의 진입이 제한될 수 있습니다.</li></ul>`
    };
};

document.addEventListener('DOMContentLoaded', () => {
    const analyzeBtn = document.getElementById('analyze-btn');
    const stockInput = document.getElementById('stock-input');
    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    const loadingOverlay = document.getElementById('loading-overlay');
    const emptyState = document.getElementById('empty-state');
    const reportContainer = document.getElementById('report-container');

    // Enter 키로 검색 실행
    stockInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performAnalysis();
        }
    });

    analyzeBtn.addEventListener('click', performAnalysis);

    downloadPdfBtn.addEventListener('click', () => {
        const element = document.getElementById('pdf-content');
        const companyName = document.getElementById('company-name').innerText;
        
        const opt = {
            margin:       10,
            filename:     `${companyName}_AI_Analyst_Report.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // PDF 생성 중 버튼 비활성화 및 텍스트 변경
        const originalText = downloadPdfBtn.innerHTML;
        downloadPdfBtn.innerHTML = '생성 중...';
        downloadPdfBtn.disabled = true;

        html2pdf().set(opt).from(element).save().then(() => {
            downloadPdfBtn.innerHTML = originalText;
            downloadPdfBtn.disabled = false;
        });
    });

    function performAnalysis() {
        const query = stockInput.value.trim();
        if (!query) {
            alert('기업명 또는 종목코드를 입력해주세요. (예: 삼성전자)');
            stockInput.focus();
            return;
        }

        // 로딩 화면 표시 및 기존 결과 숨김
        emptyState.classList.add('hidden');
        reportContainer.classList.add('hidden');
        loadingOverlay.classList.remove('hidden');
        downloadPdfBtn.disabled = true;

        // 실제 AI API 호출을 시뮬레이션 (2~3초 지연)
        setTimeout(() => {
            generateReport(query);
            loadingOverlay.classList.add('hidden');
            reportContainer.classList.remove('hidden');
            downloadPdfBtn.disabled = false;
            
            // 결과 표시 후 부드럽게 스크롤
            reportContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 2500);
    }

    function generateReport(query) {
        // 1. 데이터 매칭 (목업 데이터 확인 후 없으면 템플릿 사용)
        const upperQuery = query.toUpperCase();
        let data = mockDataDB['삼성전자']; // Default fallback just in case
        
        // 간단한 매칭 로직
        if (query.includes('삼성') || query === '005930') {
            data = mockDataDB['삼성전자'];
        } else if (upperQuery.includes('AAPL') || query.includes('애플') || upperQuery === 'APPLE') {
            data = mockDataDB['AAPL'];
        } else {
            data = getFallbackData(query);
        }

        // 2. DOM 요소에 데이터 채우기
        // 헤더
        const today = new Date();
        document.getElementById('report-date').textContent = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
        document.getElementById('company-name').textContent = data.name;
        document.getElementById('company-ticker').textContent = data.ticker;
        
        // 투자의견 및 가격
        const ratingVal = document.getElementById('rating-value');
        ratingVal.textContent = data.rating;
        ratingVal.className = 'rating-value'; // reset classes
        ratingVal.classList.add(data.rating.toLowerCase());
        
        document.getElementById('target-price').textContent = data.targetPrice;
        document.getElementById('current-price').textContent = data.currentPrice;

        // 본문 내용
        document.getElementById('content-comprehensive').innerHTML = data.comprehensive;
        document.getElementById('content-overview').innerHTML = data.overview;
        document.getElementById('financial-text').innerHTML = data.financial;
        document.getElementById('content-industry').innerHTML = data.industry;
        document.getElementById('content-momentum').innerHTML = data.momentum;
        document.getElementById('content-risk').innerHTML = data.risk;

        // 3. 재무 차트 렌더링 (Chart.js)
        renderChart(data);
    }

    function renderChart(data) {
        const ctx = document.getElementById('financialChart').getContext('2d');
        
        // 기존 차트가 있으면 파괴 (메모리 누수 방지 및 새로고침)
        if (financialChartInstance) {
            financialChartInstance.destroy();
        }

        financialChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.financialChartLabels,
                datasets: [{
                    label: data.financialChartTitle,
                    data: data.financialChartData,
                    backgroundColor: 'rgba(0, 82, 204, 0.7)',
                    borderColor: 'rgba(0, 82, 204, 1)',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                animation: {
                    duration: 0 // PDF 변환 시 애니메이션 꼬임 방지
                }
            }
        });
    }
});