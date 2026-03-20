// AI Stock Analyst - Deep Dive & Thematic Logic

let financialChartInstance = null;

// ========================================== 
// 1. 테마 및 상황별 추천 종목 DB
// ========================================== 
const themeDB = [
    {
        keywords: ['금리 인하', '금리인하', '유동성', 'rate cut'],
        themeName: '금리 인하 수혜주 (성장주 및 배당주)',
        description: '기준금리 인하 시 자금 조달 비용이 감소하여 고정비 비중이 높은 성장주(기술주)의 미래 가치가 높아집니다. 또한, 상대적으로 배당 매력이 부각되는 리츠(REITs)나 고배당주로 자금이 유입될 수 있습니다.',
        recommendations: [
            { ticker: 'AAPL', name: 'Apple Inc.', reason: '저금리 환경에서 풍부한 유동성을 바탕으로 한 자사주 매입 강화 및 밸류에이션 리레이팅 기대.', rating: 'BUY' },
            { ticker: 'NAVER', name: 'NAVER', reason: '대표적인 국내 플랫폼 성장주로, 금리 인하 시 미래 현금흐름의 현재 가치 할인율이 낮아져 밸류에이션 회복 수혜.', rating: 'BUY' }
        ]
    },
    {
        keywords: ['ai', '인공지능', '반도체', 'hbm', '슈퍼사이클', '온디바이스'],
        themeName: 'AI 패러다임 전환 및 반도체 슈퍼사이클',
        description: '생성형 AI의 발전으로 데이터센터 향 고성능 AI 칩 및 HBM(고대역폭메모리) 수요가 폭증하고 있습니다. 향후 스마트폰과 PC에 AI가 탑재되는 \'온디바이스 AI\' 시대로 접어들며 반도체 기업들의 구조적 실적 성장이 예상됩니다.',
        recommendations: [
            { ticker: '005930.KS', name: '삼성전자', reason: 'HBM3E 양산 본격화 및 온디바이스 AI가 탑재된 갤럭시 시리즈 판매 호조에 따른 실적 턴어라운드.', rating: 'BUY' },
            { ticker: 'NVDA', name: 'NVIDIA Corp.', reason: '글로벌 AI 가속기 시장 점유율 90% 이상을 장악하며 독점적인 잉여현금흐름 창출.', rating: 'BUY' }
        ]
    },
    {
        keywords: ['고령화', '헬스케어', '바이오', '인구구조', '제약'],
        themeName: '인구 고령화 및 헬스케어 메가트렌드',
        description: '글로벌 인구 고령화가 가속화됨에 따라 만성질환 치료제, 비만 치료제, 그리고 의료기기(임플란트, 덴탈 등) 산업의 장기적인 우상향이 기대됩니다. 특히 빅파마들의 M&A와 신약 파이프라인 가치가 중요합니다.',
        recommendations: [
            { ticker: 'LLY', name: 'Eli Lilly', reason: 'GLP-1 계열 비만 및 당뇨 치료제(마운자로, 젭바운드)의 폭발적인 글로벌 수요 증가.', rating: 'BUY' },
            { ticker: '207940.KS', name: '삼성바이오로직스', reason: '안정적인 CDMO 위탁 생산 캐파 확장을 통해 고령화 시대의 바이오 의약품 수요에 대응.', rating: 'BUY' }
        ]
    }
];

// ========================================== 
// 2. 개별 종목 심층 분석 DB (Deep Dive Data)
// ========================================== 
const mockDataDB = {
    '삼성전자': {
        name: '삼성전자 (Samsung Electronics)',
        ticker: '005930.KS',
        rating: 'BUY',
        targetPrice: '105,000 KRW',
        currentPrice: '73,000 KRW',
        comprehensive: `
            <p><strong>반도체 사이클 회복과 온디바이스 AI 생태계 주도권 확보</strong></p>
            <p>당사는 삼성전자에 대한 투자의견을 'BUY'로 유지하고, 목표주가를 105,000원으로 상향 조정합니다. 1) 장기간 이어졌던 메모리 반도체의 다운턴이 완전히 종료되고 수익성 위주의 '공급자 우위' 시장으로 전환되었습니다. 2) HBM(고대역폭메모리) 경쟁력 우려로 경쟁사 대비 과도하게 디스카운트 받았던 밸류에이션이 12단 HBM3E 고객사 퀄테스트 통과 모멘텀과 함께 빠르게 정상화될 것입니다.</p>
            <p>뿐만 아니라, 자체 개발한 LLM(거대언어모델) '가우스'와 갤럭시 S 시리즈를 결합한 '온디바이스 AI' 생태계는 교체 주기가 길어진 스마트폰 시장에서 강력한 수요 촉매제(Catalyst)로 작용하여 MX 사업부의 견조한 이익 방어를 가능하게 할 것입니다.</p>`,
        overview: `
            <ul>
                <li><strong>핵심 사업 구조:</strong> DS(디바이스 솔루션: 메모리/파운드리/LSI), DX(디바이스 경험: 모바일/가전/네트워크), SDC(디스플레이), Harman(전장)의 다각화된 포트폴리오를 보유한 글로벌 IT 통합 플랫폼.</li>
                <li><strong>비즈니스 모델:</strong> 반도체 팹(Fab)에서의 초미세 공정 양산 능력과 세트(Set) 기기의 글로벌 판매망을 결합하여, 부품부터 완제품까지 자체 소화 및 외부 판매가 가능한 수직 계열화 구축.</li>
                <li><strong>경영 전략 및 주주환원:</strong> '초격차 기술' 확보를 위해 연간 50조 원 이상의 CAPEX를 집행하며, 잉여현금흐름(FCF)의 50%를 환원하는 정규 배당 및 특별 배당 정책을 통해 주주가치 제고 중.</li>
            </ul>`,
        financialText: `
            <p><strong>[실적 코멘트] 감산 효과 극대화 및 ASP 상승에 따른 레버리지 효과</strong></p>
            <p>전년도 대규모 적자를 기록했던 DS 부문이 공격적인 감산(Production Cut)과 선단 공정 전환(DDR5, HBM) 비중 확대를 통해 흑자 전환에 성공했습니다. 특히 D램과 낸드의 ASP(평균판매단가)가 전 분기 대비 두 자릿수 상승률을 기록하며 영업 레버리지 효과가 본격화되고 있습니다.</p>
            <p>2024년 예상 매출액은 295조 원(+14% YoY), 영업이익은 38조 5천억 원(+485% YoY)으로 가파른 V자 반등이 추정됩니다. 스마트폰(MX) 부문 역시 AI 기능 탑재로 인한 ASP 상승으로 두 자릿수 영업이익률을 수성할 것으로 보입니다.</p>`,
        financialTable: [
            ['매출액 (조 원)', '302.2', '258.9', '295.4', '325.1'],
            ['영업이익 (조 원)', '43.3', '6.5', '38.5', '52.4'],
            ['지배주주순이익 (조 원)', '54.7', '15.1', '30.2', '41.5'],
            ['영업이익률 (%)', '14.3%', '2.5%', '13.0%', '16.1%'],
            ['ROE (%)', '17.0%', '4.1%', '8.5%', '11.2%'],
            ['P/E (배)', '9.5x', '35.2x', '14.8x', '10.5x']
        ],
        financialChartData: [43.3, 6.5, 38.5, 52.4],
        financialChartLabels: ['2022', '2023', '2024(E)', '2025(E)'],
        financialChartTitle: '연간 영업이익 추이 (조 원)',
        industry: `
            <p><strong>[메모리 산업]</strong> AI 서버 증설 경쟁에 따라 빅테크(CSP)들의 자본 지출이 증가하며 고용량 서버 D램 및 eSSD 수요가 폭발하고 있습니다. 공급 측면에서는 HBM의 다이(Die) 사이즈가 일반 D램 대비 커서 웨이퍼 캐파를 많이 잠식하므로, 레거시(범용) D램의 공급 부족 현상이 심화되어 가격 상승 사이클이 장기화될 전망입니다.</p>
            <p><strong>[파운드리 경쟁]</strong> TSMC가 AI 가속기 칩 양산을 독점하다시피 하고 있어 점유율 격차를 좁히기는 쉽지 않으나, 3나노 이하 선단 공정(GAA 기술)에서의 수율 안정화와 메인 벤더들의 멀티 벤더(Multi-vendor) 전략 채택 시 삼성전자 파운드리의 낙수효과가 기대됩니다.</p>`,
        momentum: `
            <p><strong>[수급 분석]</strong> 최근 3개월간 외국인 투자자들은 국내 증시에서 삼성전자를 최우선 순위로 순매수하고 있습니다. 이는 글로벌 반도체 벤치마크 지수 대비 삼성전자의 상대적 소외 현상(Underperformance)이 해소되는 과정으로 해석됩니다.</p>
            <p><strong>[기술적 분석]</strong> 주가는 장기 저항선인 8만 원 선 돌파를 시도하고 있으며, 120일 이동평균선이 우상향으로 전환되었습니다. RSI(상대강도지수)는 60 부근으로 추가 상승 여력이 충분한 구간입니다.</p>`,
        riskText: `
            <p>전사 실적에 가장 큰 영향을 미치는 핵심 리스크는 다음과 같습니다.</p>`,
        swot: {
            s: [
                '메모리 반도체 원가 경쟁력 및 막강한 현금 창출력',
                '부품(부품)부터 세트(스마트폰/가전)까지 아우르는 밸류체인 수직 계열화'
            ],
            w: [
                '경쟁사 대비 HBM 시장 초기 진입 및 점유율 확보 지연',
                '파운드리 선단 공정의 대형 고객사(NVIDIA, Apple 등) 수주 부진'
            ],
            o: [
                '온디바이스 AI 시장 개화로 인한 B2C 하드웨어 교체 슈퍼사이클',
                '메모리 공급 부족으로 인한 D램/낸드 가격(ASP) 구조적 상승'
            ],
            t: [
                '미·중 지정학적 갈등에 따른 반도체 수출 통제 및 공급망 리스크',
                '중국 YMTC, CXMT 등 자국 정부 지원을 받는 로컬 업체의 추격'
            ]
        }
    },
    'AAPL': {
        name: 'Apple Inc. (애플)',
        ticker: 'AAPL',
        rating: 'BUY',
        targetPrice: '$235.00',
        currentPrice: '$185.20',
        comprehensive: `
            <p><strong>'Apple Intelligence'가 촉발할 강력한 하드웨어 교체 사이클</strong></p>
            <p>애플은 20억 대 이상의 활성 기기(Active Installed Base)를 바탕으로 단순한 하드웨어 판매를 넘어 '서비스 생태계'에서 막대한 현금을 창출하고 있습니다. 최근 WWDC에서 발표된 'Apple Intelligence'는 개인정보 보호를 최우선으로 하는 온디바이스 AI와 클라우드 AI의 하이브리드 모델을 제시하며 시장의 AI 뒤처짐 우려를 일거에 해소했습니다.</p>
            <p>새로운 AI 기능은 iPhone 15 Pro 이상의 고사양 모델에서만 제한적으로 구동되므로, 구형 모델 사용자들의 대규모 업그레이드(Super Cycle)를 강제할 것입니다. 서비스 매출의 고성장과 하드웨어 판매의 반등이 겹치는 향후 2년은 애플에게 새로운 성장 국면이 될 것입니다.</p>`,
        overview: `
            <ul>
                <li><strong>핵심 사업 구조:</strong> 하드웨어(iPhone 비중 약 50%, Mac, iPad, Wearables)와 고수익 서비스(App Store, Apple Music, iCloud, Apple Pay, 라이선싱 등) 부문으로 구성.</li>
                <li><strong>비즈니스 모델:</strong> iOS/macOS라는 폐쇄적이지만 압도적인 사용자 경험을 제공하는 소프트웨어 생태계를 통해 고객 락인(Lock-in)을 극대화하고, 서비스 구독 모델로 LTV(고객생애가치)를 높임.</li>
                <li><strong>자체 칩셋 역량:</strong> ARM 아키텍처 기반의 A-시리즈(모바일) 및 M-시리즈(PC/태블릿) 실리콘 자체 설계를 통해 타사 대비 전력 효율성과 연산 성능에서 압도적 우위 점함.</li>
            </ul>`,
        financialText: `
            <p><strong>[실적 코멘트] 서비스 마진율 상승이 견인하는 구조적 이익 성장</strong></p>
            <p>최근 분기 실적에서 하드웨어 매출 성장은 중국 시장 부진 등으로 둔화되었으나, 서비스 부문의 매출이 전년 동기 대비 14% 증가하며 사상 최고치를 경신했습니다. 특히 서비스 부문의 매출총이익률(Gross Margin)은 74%를 상회하여 전사 마진율 개선을 주도하고 있습니다.</p>
            <p>경이로운 잉여현금흐름(연간 약 1,000억 달러 수준)을 바탕으로 역사상 최대 규모인 1,100억 달러의 자사주 매입 프로그램을 발표했습니다. 이는 EPS(주당순이익)의 지속적인 우상향을 담보하는 핵심 재무 전략입니다.</p>`,
        financialTable: [
            ['매출액 (Billion $)', '394.3', '383.2', '390.5', '415.8'],
            ['영업이익 (Billion $)', '119.4', '114.3', '118.2', '128.5'],
            ['순이익 (Billion $)', '99.8', '96.9', '101.5', '110.2'],
            ['매출총이익률 (%)', '43.3%', '44.1%', '45.8%', '46.5%'],
            ['ROE (%)', '175.4%', '156.0%', '160.5%', '165.2%'],
            ['P/E (배)', '23.5x', '29.8x', '26.4x', '24.1x']
        ],
        financialChartData: [119.4, 114.3, 118.2, 128.5],
        financialChartLabels: ['FY22', 'FY23', 'FY24(E)', 'FY25(E)'],
        financialChartTitle: 'Operating Income (Billion USD)',
        industry: `
            <p><strong>[프리미엄 폰 시장 독식]</strong> 글로벌 스마트폰 출하량은 역성장 혹은 정체 중이나, 600달러 이상의 프리미엄 스마트폰 시장은 견조하게 성장하고 있습니다. 애플은 이 고가 시장에서 70% 이상의 점유율을 차지하며 산업 내 이익을 사실상 독식하고 있습니다.</p>
            <p><strong>[공간 컴퓨팅과 웨어러블]</strong> Vision Pro의 초기 판매량은 높지 않으나, '공간 컴퓨팅(Spatial Computing)'이라는 새로운 폼팩터의 기준을 제시했습니다. 향후 원가 절감형 모델이 출시될 경우 스마트폰을 잇는 차세대 디바이스 생태계의 중심축이 될 잠재력이 있습니다.</p>`,
        momentum: `
            <p><strong>[수급 및 센티먼트]</strong> AI 내러티브 부재로 연초 마이크로소프트와 엔비디아에 시가총액 1위 자리를 내주며 기관 투자자들의 비중 축소가 있었습니다. 그러나 WWDC 이후 월가 애널리스트들의 목표가 상향 리포트가 쏟아지며 강력한 숏커버링과 신규 매수세가 유입되었습니다.</p>
            <p><strong>[기술적 분석]</strong> 주가는 장기 저항선인 195달러 선을 강한 거래량과 함께 돌파(Breakout)하며 사상 최고치 경신 랠리에 돌입했습니다. 단기 이격도가 벌어졌으나, 조정 시 매수(Buy on dips) 전략이 유효한 상승 추세입니다.</p>`,
        riskText: `
            <p>전사 실적에 가장 큰 영향을 미치는 핵심 리스크는 다음과 같습니다.</p>`,
        swot: {
            s: [
                '비교 불가능한 브랜드 충성도 및 하드웨어/소프트웨어 통합 생태계',
                '압도적인 잉여현금흐름 기반의 대규모 주주환원(자사주 매입)'
            ],
            w: [
                '전체 매출에서 iPhone이 차지하는 비중이 지나치게 높음 (의존도 심화)',
                '생성형 AI의 자체 파운데이션 모델 경쟁력에 대한 시장의 의구심'
            ],
            o: [
                'Apple Intelligence 적용 모델 제한으로 인한 대규모 하드웨어 교체 수요 유발',
                '신흥국(인도, 베트남 등)에서의 프리미엄폰 시장 침투율 확대'
            ],
            t: [
                '미국 법무부(DOJ) 및 유럽 연합(EU)의 앱스토어 독점 관련 규제 철퇴',
                '중국 시장 내 화웨이 등 애국 소비 부상 및 공공기관 아이폰 사용 금지령'
            ]
        }
    }
};

// 동적 데이터 생성 (DB에 없는 범용 종목)
const getFallbackData = (query) => {
    const uppercaseQuery = query.toUpperCase();
    return {
        name: `${uppercaseQuery} Corporation`,
        ticker: uppercaseQuery,
        rating: 'HOLD',
        targetPrice: 'AI 분석 산출 중',
        currentPrice: '-',
        comprehensive: `<p><strong>${uppercaseQuery}</strong>에 대한 심층 애널리스트 리포트 데이터 수집 및 분석 프로세스가 진행 중입니다. 현재 시스템은 글로벌 시가총액 상위 대형주 및 트렌드 주도주(AI, 반도체, 헬스케어 등)에 분석 역량이 집중되어 있습니다.</p><p>당사의 1차 AI 퀀트 모델 분석 결과, 동사는 속한 산업군 내에서 안정적인 현금흐름을 창출하고 있으나 최근 매크로 환경(금리, 환율, 원자재) 변화에 따른 마진 압박을 일부 겪고 있는 것으로 추정됩니다. 뚜렷한 실적 개선(Turnaround) 또는 신성장 동력이 가시화되기 전까지는 시장 수익률(Market-weight) 수준의 성과가 예상되므로 <strong>'중립(HOLD)'</strong> 의견을 제시합니다.</p>`,
        overview: `<ul><li><strong>분석 대상 기업:</strong> ${uppercaseQuery}</li><li>AI가 글로벌 금융 공시 데이터(10-K, 분기보고서 등) 및 최신 뉴스 플로우를 파싱하여 비즈니스 모델을 재구성하고 있습니다.</li><li>경쟁사 대비 핵심 우위 요소 및 지배구조 정보는 추후 딥러닝 모델 업데이트 시 반영될 예정입니다.</li></ul>`,
        financialText: `<p>최근 3개년 주요 재무제표 원본 데이터를 추출 및 정제하는 중입니다. 가치평가(Valuation) 모형 산출을 위한 추정 PER, PBR, ROE 데이터 셋이 준비 중입니다.</p><p>동종 업계 대비 매출 성장률은 평균 수준을 유지하고 있으나, 영업 레버리지 효과를 극대화하기 위한 비용 통제(Cost Control) 여부가 향후 주가 향방의 핵심 키(Key)가 될 것입니다.</p>`,
        financialTable: [
            ['지표', 'T-3', 'T-2', 'T-1', '현재(TTM)'] ,
            ['매출액 지수', '100.0', '104.2', '109.5', '111.0'],
            ['영업이익률', '평균', '평균', '하회', '회복중'],
            ['부채비율', '안정적', '안정적', '보통', '보통']
        ],
        financialChartData: [100, 104.2, 109.5, 111.0],
        financialChartLabels: ['T-3', 'T-2', 'T-1', 'TTM'],
        financialChartTitle: '매출 성장 지수 (Base=100)',
        industry: `<p>${uppercaseQuery}가 속한 산업군은 현재 구조적인 패러다임 변화(디지털 전환, 친환경 규제 강화, 글로벌 공급망 블록화 등)의 한가운데에 놓여 있습니다.</p><p>업종 내 상위 업체로의 점유율 집중(Consolidation) 현상이 가속화되고 있으며, R&D 역량과 자본력을 갖춘 선도 기업 위주로 시장이 재편될 가능성이 높습니다.</p>`,
        momentum: `<p>최근 주가 흐름은 벤치마크(S&P 500 또는 KOSPI) 지수 대비 뚜렷한 초과 수익(Alpha)을 내지 못하고 횡보하는 움직임을 보이고 있습니다. 스마트 머니(외국인/기관)의 연속적인 순매수 유입은 관찰되지 않습니다.</p><p>기술적 분석 상 박스권 하단에 위치하여 하방 경직성은 확보한 것으로 보이나, 단기 저항선을 강하게 뚫어낼 만한 실적 서프라이즈나 촉매제(Catalyst)가 부재한 상황입니다.</p>`,
        riskText: `<p>해당 기업 투자 시 유의해야 할 일반적인 리스크 요인은 다음과 같습니다.</p>`,
        swot: {
            s: ['안정적인 기존 현금창출원(Cash Cow) 보유', '업계 내 일정 수준 이상의 브랜드 인지도'],
            w: ['미래 성장 동력(신사업) 부재 및 R&D 투자 부족', '매크로 변수에 민감한 수익 구조'],
            o: ['경쟁사 도태 시 반사이익에 따른 점유율 확대 가능성', '산업 턴어라운드 시 영업 레버리지 극대화'],
            t: ['신규 진입자의 파괴적 혁신(Disruptive Innovation) 위협', '글로벌 경기 침체 시 전방 산업 수요 급감']
        }
    };
};

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const logoHome = document.getElementById('logo-home');
    const homeView = document.getElementById('home-view');
    const reportContainer = document.getElementById('report-container');
    
    // Top bar search
    const topStockInput = document.getElementById('stock-input');
    const topAnalyzeBtn = document.getElementById('analyze-btn');
    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    
    // Loading overlay
    const loadingOverlay = document.getElementById('loading-overlay');
    const loadingMsg = document.getElementById('loading-msg');
    const loadingSubMsg = document.getElementById('loading-sub-msg');
    
    // Theme/Situation Search
    const situationInput = document.getElementById('situation-input');
    const recommendBtn = document.getElementById('recommend-btn');
    const tagBtns = document.querySelectorAll('.tag');
    const recommendationResults = document.getElementById('recommendation-results');
    const analyzedThemeSpan = document.getElementById('analyzed-theme');
    const themeDescP = document.getElementById('theme-description');
    const recommendationCards = document.getElementById('recommendation-cards');

    // Event Listeners
    logoHome.addEventListener('click', () => {
        homeView.classList.remove('hidden');
        reportContainer.classList.add('hidden');
        recommendationResults.classList.add('hidden');
        topStockInput.value = '';
        situationInput.value = '';
        window.scrollTo(0,0);
    });

    // Top Bar Search
    topStockInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performAnalysis(topStockInput.value.trim());
    });
    topAnalyzeBtn.addEventListener('click', () => {
        performAnalysis(topStockInput.value.trim());
    });

    // Theme Search
    recommendBtn.addEventListener('click', () => {
        performThemeAnalysis(situationInput.value.trim());
    });
    tagBtns.forEach(tag => {
        tag.addEventListener('click', (e) => {
            situationInput.value = e.target.dataset.query;
            performThemeAnalysis(e.target.dataset.query);
        });
    });

    // PDF Download
    downloadPdfBtn.addEventListener('click', () => {
        const element = document.getElementById('pdf-content');
        const companyName = document.getElementById('company-name').innerText;
        
        const opt = {
            margin:       10,
            filename:     `${companyName}_DeepDive_Report.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        const originalText = downloadPdfBtn.innerHTML;
        downloadPdfBtn.innerHTML = '생성 중...';
        downloadPdfBtn.disabled = true;

        html2pdf().set(opt).from(element).save().then(() => {
            downloadPdfBtn.innerHTML = originalText;
            downloadPdfBtn.disabled = false;
        });
    });

    // Logic: Theme Analysis
    function performThemeAnalysis(query) {
        if (!query) {
            alert('투자 상황이나 테마를 입력해주세요.');
            situationInput.focus();
            return;
        }

        // Show loading
        loadingMsg.textContent = '입력하신 상황(테마)을 분석하여 최적의 수혜주를 탐색 중입니다...';
        loadingSubMsg.textContent = '거시경제 데이터, 밸류체인 연관성, 과거 주가 상관계수를 연산 중입니다.';
        loadingOverlay.classList.remove('hidden');
        recommendationResults.classList.add('hidden');

        setTimeout(() => {
            // Find matching theme
            let matchedTheme = themeDB[1]; // Default to AI
            const lowerQuery = query.toLowerCase();
            
            for (const theme of themeDB) {
                if (theme.keywords.some(kw => lowerQuery.includes(kw))) {
                    matchedTheme = theme;
                    break;
                }
            }

            renderRecommendations(matchedTheme);
            
            loadingOverlay.classList.add('hidden');
            recommendationResults.classList.remove('hidden');
            recommendationResults.scrollIntoView({ behavior: 'smooth' });
        }, 2000);
    }

    function renderRecommendations(theme) {
        analyzedThemeSpan.textContent = theme.themeName;
        themeDescP.textContent = theme.description;
        
        recommendationCards.innerHTML = '';
        
        theme.recommendations.forEach(rec => {
            const card = document.createElement('div');
            card.className = 'stock-card';
            card.innerHTML = `
                <div class="stock-card-header">
                    <span class="stock-card-name">${rec.name}</span>
                    <span class="stock-card-ticker">${rec.ticker}</span>
                </div>
                <div class="stock-card-reason">
                    ${rec.reason}
                </div>
                <div class="stock-card-footer">
                    <span class="card-rating ${rec.rating.toLowerCase()}">의견: ${rec.rating}</span>
                    <span class="card-action">심층 분석 보기 ➔</span>
                </div>
            `;
            
            card.addEventListener('click', () => {
                performAnalysis(rec.ticker);
            });
            
            recommendationCards.appendChild(card);
        });
    }

    // Logic: Individual Stock Analysis
    function performAnalysis(query) {
        if (!query) {
            alert('분석할 기업명 또는 종목코드를 입력해주세요.');
            return;
        }

        reportContainer.classList.add('hidden');
        downloadPdfBtn.disabled = true;
        
        loadingMsg.textContent = 'AI 애널리스트가 심층 분석 데이터를 수집하고 있습니다...';
        loadingSubMsg.textContent = '재무제표 파싱, 컨센서스 추합, 산업 밸류체인 맵핑을 수행 중입니다.';
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
                console.error('Report Generation Error:', error);
                alert('리포트 생성 중 오류가 발생했습니다.');
                loadingOverlay.classList.add('hidden');
            }
        }, 2500);
    }

    function generateReport(query) {
        const upperQuery = query.toUpperCase();
        let data = null; 
        
        if (query.includes('삼성') || query === '005930' || query === '005930.KS') {
            data = mockDataDB['삼성전자'];
        } else if (upperQuery.includes('AAPL') || query.includes('애플') || upperQuery.includes('APPLE')) {
            data = mockDataDB['AAPL'];
        } else {
            data = getFallbackData(query);
        }

        // Header
        const today = new Date();
        document.getElementById('report-date').textContent = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
        document.getElementById('company-name').textContent = data.name;
        document.getElementById('company-ticker').textContent = data.ticker;
        
        const ratingVal = document.getElementById('rating-value');
        ratingVal.textContent = data.rating;
        ratingVal.className = 'rating-value';
        ratingVal.classList.add(data.rating.toLowerCase());
        
        document.getElementById('target-price').textContent = data.targetPrice;
        document.getElementById('current-price').textContent = data.currentPrice;

        // Content
        document.getElementById('content-comprehensive').innerHTML = data.comprehensive;
        document.getElementById('content-overview').innerHTML = data.overview;
        document.getElementById('financial-text').innerHTML = data.financialText;
        document.getElementById('content-industry').innerHTML = data.industry;
        document.getElementById('content-momentum').innerHTML = data.momentum;
        document.getElementById('content-risk').innerHTML = data.riskText;

        // Render Financial Table
        renderFinancialTable(data.financialTable);

        // Render SWOT
        renderSwot(data.swot);

        // Chart
        renderChart(data);
    }

    function renderFinancialTable(tableData) {
        const theadRow = document.querySelector('.financial-table thead tr');
        const tbody = document.getElementById('financial-table-body');
        
        if (!theadRow || !tbody) return;

        // Extract headers from first row of data
        const headers = tableData[0];
        theadRow.innerHTML = '';
        headers.forEach((h) => {
            const th = document.createElement('th');
            th.textContent = h;
            theadRow.appendChild(th);
        });

        // Body rows
        tbody.innerHTML = '';
        for(let i=1; i<tableData.length; i++) {
            const tr = document.createElement('tr');
            tableData[i].forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        }
    }

    function renderSwot(swotData) {
        const container = document.getElementById('swot-container');
        if (!container) return;
        container.innerHTML = '';

        const swotMap = [
            { key: 's', title: 'Strength (강점)', class: 'swot-s', icon: '💪' },
            { key: 'w', title: 'Weakness (약점)', class: 'swot-w', icon: '⚠️' },
            { key: 'o', title: 'Opportunity (기회)', class: 'swot-o', icon: '🚀' },
            { key: 't', title: 'Threat (위협)', class: 'swot-t', icon: '🛑' }
        ];

        swotMap.forEach(item => {
            const itemsHtml = swotData[item.key].map(text => `<li>${text}</li>`).join('');
            const html = `
                <div class="swot-box ${item.class}">
                    <h4>${item.icon} ${item.title}</h4>
                    <ul>${itemsHtml}</ul>
                </div>
            `;
            container.innerHTML += html;
        });
    }

    function renderChart(data) {
        const canvas = document.getElementById('financialChart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (financialChartInstance) financialChartInstance.destroy();

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
                maintainAspectRatio: false,
                plugins: { legend: { position: 'top' }, title: { display: false } },
                scales: { y: { beginAtZero: true } },
                animation: { duration: 0 }
            }
        });
    }
});