/**
 * AI Video Prompt Generator JS - Dynamic Version
 * Supports switching video purposes (Product Ad, Cinematic Trailer, Daily Vlog)
 * Adds required (*) validations and 'None/없음' tags for optional fields.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Current application state
    let currentStep = 1;
    const totalSteps = 10;
    let selectedPurpose = 'product'; // Default: product, other options: cinematic, vlog

    // Form inputs value registry
    let formData = {};

    // Definition of Video Purposes
    const purposeConfigs = {
        product: {
            title: '브랜드 제품 광고',
            desc: '모델의 세련된 외형, 의상, 구체적인 뷰티/IT 제품 묘사와 제품 배치 공간에 최적화된 프롬프트입니다.',
            icon: 'fa-box-open',
            steps: [
                { num: 1, title: '기본 정보', badge: '영상 기본 정보 정하기' },
                { num: 2, title: '주요 인물', badge: '주요 인물 설정하기' },
                { num: 3, title: '의상 & 스타일', badge: '의상과 스타일 정하기' },
                { num: 4, title: '제품 설정', badge: '제품 설정하기' },
                { num: 5, title: '장소 & 공간', badge: '장소와 공간 설정하기' },
                { num: 6, title: '영상 스타일', badge: '영상 스타일과 카메라 설정' },
                { num: 7, title: '타임라인', badge: '타임라인 구성하기' },
                { num: 8, title: '오디오', badge: '오디오 설정하기' },
                { num: 9, title: '금지 요소', badge: '금지 요소 및 최종 목표' }
            ],
            fields: {
                // Step 1
                'step1-length': { label: '영상 길이', token: '{영상 길이}', type: 'input', placeholder: '예: 15초', tags: ['15초', '30초', '60초'], required: true, step: 1 },
                'step1-ratio': { label: '영상 비율', token: '{영상 비율}', type: 'input', placeholder: '예: 세로형 9:16', tags: ['세로형 9:16', '가로형 16:9', '정방형 1:1'], required: true, step: 1 },
                'step1-genre': { label: '영상 장르', token: '{영상 장르}', type: 'input', placeholder: '예: 한국 뷰티 광고', tags: ['한국 뷰티 광고', '패션 필름', 'IT 테크 광고'], required: true, step: 1 },
                'step1-purpose': { label: '광고/영상 목적', token: '{광고/영상 목적}', type: 'input', placeholder: '예: 프리미엄 스킨케어 세럼 홍보', required: true, step: 1 },
                'step1-mood': { label: '전체 분위기', token: '{전체 분위기}', type: 'input', placeholder: '예: 깨끗하고 고급스럽고 현대적인 분위기', required: true, step: 1 },
                'step1-platform': { label: '타깃 플랫폼', token: '{타깃 플랫폼}', type: 'input', placeholder: '예: 인스타그램 릴스, 틱톡, 유튜브 쇼츠', step: 1 },
                // Step 2
                'step2-gender': { label: '성별', token: '{성별}', type: 'input', placeholder: '예: 여성', tags: ['여성', '남성'], required: true, step: 2 },
                'step2-age': { label: '나이대', token: '{나이대}', type: 'input', placeholder: '예: 20대 초중반', tags: ['20대 초중반', '30대 초반'], required: true, step: 2 },
                'step2-nationality': { label: '국적 / 이미지', token: '{국적/이미지}', type: 'input', placeholder: '예: 한국 여성 모델', tags: ['한국 여성 모델', '동양인 모델'], required: true, step: 2 },
                'step2-face': { label: '얼굴 분위기', token: '{얼굴 분위기}', type: 'input', placeholder: '예: 세련되고 깨끗하며 자연스러운 얼굴', step: 2 },
                'step2-skin': { label: '피부 표현', token: '{피부 표현}', type: 'input', placeholder: '예: 맑고 촉촉한 자연스러운 물광 피부', tags: ['맑고 촉촉한 물광 피부', '뽀송하고 보송보송한 피부'], step: 2 },
                'step2-hair': { label: '헤어스타일', token: '{헤어스타일}', type: 'input', placeholder: '예: 긴 검은 생머리', step: 2 },
                'step2-makeup': { label: '메이크업', token: '{메이크업}', type: 'input', placeholder: '예: 은은한 핑크빛 메이크업', step: 2 },
                'step2-expression': { label: '표정 / 눈빛', token: '{표정/눈빛}', type: 'input', placeholder: '예: 차분하지만 매력적인 눈빛, 부드러운 미소', step: 2 },
                'step2-consistency': { label: '유지해야 할 일관성', token: '{유지해야 할 일관성}', type: 'input', placeholder: '예: 영상 전체 동안 같은 얼굴, 헤어스타일, 의상 유지', step: 2 },
                'step2-avoid': { label: '피해야 할 느낌', token: '{피해야 할 느낌}', type: 'input', placeholder: '예: 과도한 성형 느낌, 인공적인 플라스틱 피부', step: 2 },
                // Step 3
                'step3-top': { label: '상의', token: '{상의}', type: 'input', placeholder: '예: 아이보리색 실크 슬리브리스 블라우스', step: 3 },
                'step3-outer': { label: '겉옷', token: '{겉옷}', type: 'input', placeholder: '예: 얇은 베이지 가디건', step: 3 },
                'step3-acc': { label: '액세서리', token: '{액세서리}', type: 'input', placeholder: '예: 작은 진주 귀걸이', step: 3 },
                'step3-outfit-mood': { label: '전체 의상 분위기', token: '{전체 의상 분위기}', type: 'input', placeholder: '예: 깨끗하고 고급스러운 스킨케어 광고 느낌', step: 3 },
                'step3-exposure': { label: '노출 수준', token: '{노출 수준}', type: 'input', placeholder: '예: 과하지 않고 우아함', step: 3 },
                'step3-avoid-clothing': { label: '피해야 할 의상 요소', token: '{피해야 할 의상 요소}', type: 'input', placeholder: '예: 화려한 패턴, 과한 노출, 강한 색상', step: 3 },
                // Step 4
                'step4-prod-type': { label: '제품 종류', token: '{제품 종류}', type: 'input', placeholder: '예: 스킨케어 세럼', required: true, step: 4 },
                'step4-prod-shape': { label: '제품 형태', token: '{제품 형태}', type: 'input', placeholder: '예: 작은 세럼 병', step: 4 },
                'step4-material': { label: '재질', token: '{재질}', type: 'input', placeholder: '예: 반투명 유리병', step: 4 },
                'step4-cap': { label: '캡/뚜껑 디자인', token: '{캡/뚜껑 디자인}', type: 'input', placeholder: '예: 미니멀한 실버 캡', step: 4 },
                'step4-logo': { label: '브랜드 표시 여부', token: '{브랜드 표시 여부}', type: 'input', placeholder: '예: 브랜드 로고 없음', step: 4 },
                'step4-text': { label: '텍스트 표시 여부', token: '{텍스트 표시 여부}', type: 'input', placeholder: '예: 읽을 수 있는 글자 없음', step: 4 },
                'step4-prod-mood': { label: '제품 분위기', token: '{제품 분위기}', type: 'input', placeholder: '예: 프리미엄하고 깨끗하며 고급스러운 느낌', step: 4 },
                // Step 5
                'step5-place': { label: '장소', token: '{장소}', type: 'input', placeholder: '예: 밝고 세련된 현대식 아파트 욕실과 화장대 공간', required: true, step: 5 },
                'step5-space': { label: '주요 공간', token: '{주요 공간}', type: 'input', placeholder: '예: 흰색 세라믹 세면대, 대형 거울, 깨끗한 화장대', step: 5 },
                'step5-interior': { label: '인테리어 톤', token: '{인테리어 톤}', type: 'input', placeholder: '예: 화이트와 베이지 톤', step: 5 },
                'step5-props': { label: '주요 소품', token: '{주요 소품}', type: 'input', placeholder: '예: 베이지 수건, 작은 꽃병, 얇은 커튼', step: 5 },
                'step5-lighting': { label: '조명', token: '{조명}', type: 'input', placeholder: '예: 커튼 사이로 들어오는 부드러운 아침 햇살', step: 5 },
                'step5-time': { label: '시간대', token: '{시간대}', type: 'input', placeholder: '예: 아침', step: 5 },
                'step5-space-mood': { label: '전체 공간 분위기', token: '{전체 공간 분위기}', type: 'input', placeholder: '예: 고급스럽지만 과하지 않고 깨끗한 분위기', step: 5 },
                // Step 6
                'step6-visual-style': { label: '시각 스타일', token: '{시각 스타일}', type: 'input', placeholder: '예: 고급 한국 화장품 광고', required: true, step: 6 },
                'step6-rhythm': { label: '편집 리듬', token: '{편집 리듬}', type: 'input', placeholder: '예: 1~2초 단위의 빠른 컷 전환', step: 6 },
                'step6-cam-move': { label: '카메라 무빙', token: '{카메라 무빙}', type: 'input', placeholder: '예: 부드러운 슬로우모션과 짧은 움직임', step: 6 },
                'step6-lens': { label: '렌즈 느낌', token: '{렌즈 느낌}', type: 'input', placeholder: '예: 매크로 렌즈, 얕은 심도', step: 6 },
                'step6-focus': { label: '초점 스타일', token: '{초점 스타일}', type: 'input', placeholder: '예: 제품과 얼굴 사이의 빠른 포커스 전환', step: 6 },
                'step6-skin-express': { label: '피부 표현 방식', token: '{피부 표현 방식}', type: 'input', placeholder: '예: 촉촉하지만 현실적인 피부', step: 6 },
                'step6-transition': { label: '컷 전환 방식', token: '{컷 전환 방식}', type: 'input', placeholder: '예: 깔끔하고 리듬감 있는 숏폼 광고 편집', step: 6 },
                'step6-avoid-style': { label: '피해야 할 영상 스타일', token: '{피해야 할 영상 스타일}', type: 'input', placeholder: '예: 지루한 롱테이크, 과도한 필터', step: 6 },
                // Step 7
                'step7-scene1': { label: '00:00 – 00:02 장면', token: '{00:00–00:02 장면}', type: 'textarea', placeholder: '첫 장면에 대한 구체적 묘사를 입력하세요', required: true, step: 7 },
                'step7-scene2': { label: '00:02 – 00:04 장면', token: '{00:02–00:04 장면}', type: 'textarea', placeholder: '두 번째 장면에 대한 묘사', step: 7 },
                'step7-scene3': { label: '00:04 – 00:06 장면', token: '{00:04–00:06 장면}', type: 'textarea', placeholder: '세 번째 장면에 대한 묘사', step: 7 },
                'step7-scene4': { label: '00:06 – 00:08 장면', token: '{00:06–00:08 장면}', type: 'textarea', placeholder: '네 번째 장면에 대한 묘사', step: 7 },
                'step7-scene5': { label: '00:08 – 00:10 장면', token: '{00:08–00:10 장면}', type: 'textarea', placeholder: '다섯 번째 장면에 대한 묘사', step: 7 },
                'step7-scene6': { label: '00:10 – 00:12 장면', token: '{00:10–00:12 장면}', type: 'textarea', placeholder: '여섯 번째 장면에 대한 묘사', step: 7 },
                'step7-scene7': { label: '00:12 – 00:14 장면', token: '{00:12–00:14 장면}', type: 'textarea', placeholder: '일곱 번째 장면에 대한 묘사', step: 7 },
                'step7-scene8': { label: '00:14 – 00:15 장면', token: '{00:14–00:15 장면}', type: 'textarea', placeholder: '여덟 번째 장면에 대한 묘사', step: 7 },
                // Step 8
                'step8-bgm': { label: '배경음악', token: '{배경음악}', type: 'input', placeholder: '예: 가볍고 세련된 광고 분위기의 부드러운 사운드', step: 8 },
                'step8-sfx': { label: '효과음', token: '{효과음}', type: 'input', placeholder: '예: 병을 집는 소리, 세럼 방울 떨어지는 소리', step: 8 },
                'step8-ambient': { label: '실내 분위기', token: '{실내 분위기}', type: 'input', placeholder: '예: 조용한 아침 실내 분위기', step: 8 },
                'step8-narration': { label: '내레이션 여부', token: '{내레이션 여부}', type: 'input', placeholder: '예: 없음', step: 8 },
                'step8-dialogue': { label: '대사 여부', token: '{대사 여부}', type: 'input', placeholder: '예: 없음', step: 8 },
                // Step 9
                'step9-avoid-errors': { label: '피해야 할 시각적 오류 (중요)', token: '{피해야 할 시각적 오류}', type: 'textarea', placeholder: '예: 얼굴이 바뀌는 것, 손가락 왜곡, 제품 라벨 생성, 과한 피부 보정', step: 9 },
                'step9-goal': { label: '최종 목표', token: '{목표}', type: 'input', placeholder: '예: 프리미엄 스킨케어 숏폼 광고 영상 프롬프트 완성', required: true, step: 9 }
            },
            template: `[영상 기본 정보]
{영상 길이}짜리 {영상 비율} {영상 장르} 영상을 만들어줘.
목적은 {광고/영상 목적}이며, 전체 분위기는 {전체 분위기}이다.

[주요 인물]
주요 인물은 {나이대}의 {국적/이미지} {성별} 모델이다.
{얼굴 분위기}
피부는 {피부 표현}이며, 헤어스타일은 {헤어스타일}이다.
메이크업은 {메이크업}이고, 표정과 눈빛은 {표정/눈빛}이다.
영상 전체 동안 {유지해야 할 일관성}을 유지한다.
{피해야 할 느낌}은 피한다.

[의상]
모델은 {상의}, {겉옷}, {액세서리}를 착용한다.
전체적으로 {전체 의상 분위기}이며, {노출 수준}이어야 한다.
{피해야 할 의상 요소}는 피한다.

[제품]
제품은 {제품 종류}이며, {제품 형태}이다.
{재질}, {캡/뚜껑 디자인}으로 구성되어 있다.
{브랜드 표시 여부}, {텍스트 표시 여부}.
제품은 {제품 분위기}으로 보여야 한다.

[장소]
장소는 {장소}이다.
공간에는 {주요 공간}이 있고, 인테리어는 {인테리어 톤}이다.
{주요 소품}이 배치되어 있으며, {조명}이 들어온다.
시간대는 {시간대}이고, 전체적으로 {전체 공간 분위기}이다.

[시각 스타일]
영상은 {시각 스타일} 느낌이다.
{편집 리듬}, {카메라 무빙}, {렌즈 느낌}, {초점 스타일}을 사용한다.
피부는 {피부 표현 방식}으로 표현한다.
컷 전환은 {컷 전환 방식}으로 구성한다.
{피해야 할 영상 스타일}은 피한다.

[타임라인]
00:00–00:02
{00:00–00:02 장면}

00:02–00:04
{00:02–00:04 장면}

00:04–00:06
{00:04–00:06 장면}

00:06–00:08
{00:06–00:08 장면}

00:08–00:10
{00:08–00:10 장면}

00:10–00:12
{00:10–00:12 장면}

00:12–00:14
{00:12–00:14 장면}

00:14–00:15
{00:14–00:15 장면}

[오디오]
배경음악은 {배경음악}.
효과음은 {효과음}.
실내 분위기는 {실내 분위기}.
{내레이션 여부}. {대사 여부}.

[금지 요소]
자막 없음.
화면에 글자 없음.
브랜드 로고 없음.
제품명 없음.
읽을 수 있는 텍스트 없음.
마지막에도 문구나 자막을 넣지 말 것.
{피해야 할 시각적 오류}

[최종 목표]
{목표}`,
            examples: {
                'step1-length': '15초',
                'step1-ratio': '세로형 9:16',
                'step1-genre': '한국 뷰티 광고',
                'step1-purpose': '무브랜드 프리미엄 스킨케어 세럼 홍보',
                'step1-mood': '깨끗하고 고급스럽고 현대적인 분위기',
                'step1-platform': '숏폼 광고, 인스타그램 릴스, 틱톡, 유튜브 쇼츠',
                'step2-gender': '여성',
                'step2-age': '20대 초중반',
                'step2-nationality': '한국 여성 모델',
                'step2-face': '세련되고 깨끗하며 자연스럽게 아름다운 얼굴',
                'step2-skin': '맑고 촉촉한 자연스러운 물광 피부',
                'step2-hair': '긴 검은 생머리',
                'step2-makeup': '은은한 핑크빛 메이크업',
                'step2-expression': '차분하지만 매력적인 눈빛, 부드러운 미소',
                'step2-consistency': '영상 전체 동안 같은 얼굴, 같은 헤어스타일, 같은 의상, 같은 분위기 유지',
                'step2-avoid': '과도한 성형 느낌, 인공적인 플라스틱 피부, 과한 보정',
                'step3-top': '아이보리색 실크 슬리브리스 블라우스',
                'step3-outer': '얇은 베이지 가디건',
                'step3-acc': '작은 진주 귀걸이',
                'step3-outfit-mood': '깨끗하고 고급스러운 스킨케어 광고 느낌',
                'step3-exposure': '과하지 않고 우아함',
                'step3-avoid-clothing': '화려한 패턴, 과한 노출, 강한 색상',
                'step4-prod-type': '스킨케어 세럼',
                'step4-prod-shape': '작은 세럼 병',
                'step4-material': '반투명 유리병',
                'step4-cap': '미니멀한 실버 캡',
                'step4-logo': '브랜드 로고 없음',
                'step4-text': '읽을 수 있는 글자 없음',
                'step4-prod-mood': '프리미엄하고 깨끗하며 고급스러운 느낌',
                'step5-place': '밝고 세련된 현대식 아파트 욕실과 화장대 공간',
                'step5-space': '흰색 세라믹 세면대, 대형 거울, 깨끗한 화장대',
                'step5-interior': '화이트와 베이지 톤',
                'step5-props': '베이지 수건, 작은 꽃병, 얇은 커튼',
                'step5-lighting': '커튼 사이로 들어오는 부드러운 아침 햇살',
                'step5-time': '아침',
                'step5-space-mood': '고급스럽지만 과하지 않고 깨끗한 분위기',
                'step6-visual-style': '고급 한국 화장품 광고',
                'step6-rhythm': '1~2초 단위의 빠른 컷 전환',
                'step6-cam-move': '부드러운 슬로우모션과 짧은 움직임',
                'step6-lens': '매크로 렌즈, 얕은 심도',
                'step6-focus': '제품과 얼굴 사이의 빠른 포커스 전환',
                'step6-skin-express': '촉촉하지만 현실적인 피부, 너무 플라스틱처럼 보이지 않음',
                'step6-transition': '깔끔하고 리듬감 있는 숏폼 광고 편집',
                'step6-avoid-style': '지루한 롱테이크, 과도한 필터, 인공적인 광택',
                'step7-scene1': '아침 햇살이 커튼 사이로 들어오는 클로즈업. 모델이 거울 앞에서 고개를 살짝 돌리며 매끄러운 피부결을 보여준다.',
                'step7-scene2': '화장대 위의 무브랜드 세럼 병 매크로샷. 손이 빠르고 우아하게 병을 집어 든다.',
                'step7-scene3': '스포이드에서 투명한 세럼 한 방울이 떨어지는 초근접 매크로샷.',
                'step7-scene4': '모델이 볼에 세럼을 바르는 클로즈업. 손가락 움직임은 부드럽고 우아하다.',
                'step7-scene5': '턱선, 눈가, 볼, 입가 주변의 자연스러운 피부 윤기를 빠른 컷으로 보여준다.',
                'step7-scene6': '거울 반사샷. 모델이 제품을 손에 들고 거울 속 자신을 바라본다.',
                'step7-scene7': '제품 히어로샷. 세럼 병이 화장대 위에 놓여 있고 뒤쪽에서 모델이 자연스럽게 미소 짓는다.',
                'step7-scene8': '모델이 카메라를 향해 가까이 다가와 자신감 있게 부드럽게 미소 짓는다.',
                'step8-bgm': '가볍고 세련된 광고 분위기의 부드러운 사운드',
                'step8-sfx': '병을 집는 작은 소리, 세럼 방울 소리, 피부에 바르는 미묘한 소리',
                'step8-ambient': '조용한 아침 실내 분위기',
                'step8-narration': '없음',
                'step8-dialogue': '없음',
                'step9-avoid-errors': '얼굴이 바뀌는 것, 손가락 왜곡, 제품 라벨 생성, 과한 피부 보정, 플라스틱 같은 피부',
                'step9-goal': '무브랜드 스킨케어 세럼 광고 제작용 영상 프롬프트 완성'
            }
        },
        cinematic: {
            title: '시네마틱 트레일러',
            desc: '영화나 게임 예고편 같은 몰입도 높은 세계관 설정, 독창적인 분위기와 미술, 드라마틱한 연출에 최적화된 프롬프트입니다.',
            icon: 'fa-film',
            steps: [
                { num: 1, title: '기본 정보', badge: '영상 기본 정보 정하기' },
                { num: 2, title: '세계관 & 배경', badge: '세계관 및 배경 설정하기' },
                { num: 3, title: '등장인물', badge: '핵심 등장인물 정의' },
                { num: 4, title: '소품 & 효과', badge: '시네마틱 소품 및 시각효과 설정' },
                { num: 5, title: '촬영 공간', badge: '상세 장소와 공간 구성' },
                { num: 6, title: '시각 연출', badge: '영상 비주얼 및 카메라 스타일' },
                { num: 7, title: '타임라인', badge: '스토리 전개 및 타임라인' },
                { num: 8, title: '오디오', badge: '시네마틱 오디오 설정' },
                { num: 9, title: '금지 요소', badge: '금지 제한 및 최종 목표' }
            ],
            fields: {
                // Step 1
                'step1-length': { label: '영상 길이', token: '{영상 길이}', type: 'input', placeholder: '예: 30초', tags: ['15초', '30초', '60초'], required: true, step: 1 },
                'step1-ratio': { label: '영상 비율', token: '{영상 비율}', type: 'input', placeholder: '예: 가로형 16:9', tags: ['가로형 16:9', '시네마스코프 2.39:1', '세로형 9:16'], required: true, step: 1 },
                'step1-genre': { label: '영상 장르', token: '{영상 장르}', type: 'input', placeholder: '예: 다크 판타지 트레일러', tags: ['다크 판타지 트레일러', 'SF 디스토피아 예고편', '사이버펑크 액션'], required: true, step: 1 },
                'step1-purpose': { label: '영상 목적', token: '{영상 목적}', type: 'input', placeholder: '예: 신작 어드벤처 게임 오프닝 시네마틱 트레일러', required: true, step: 1 },
                'step1-mood': { label: '전체 분위기', token: '{전체 분위기}', type: 'input', placeholder: '예: 웅장하고 미스터리하며 긴장감 넘치는 분위기', required: true, step: 1 },
                'step1-platform': { label: '타깃 플랫폼', token: '{타깃 플랫폼}', type: 'input', placeholder: '예: 유튜브, 스팀 게임 상점 페이지', step: 1 },
                // Step 2
                'step2-era': { label: '시대 배경', token: '{시대 배경}', type: 'input', placeholder: '예: 중세 고딕 판타지 시대', tags: ['중세 고딕 판타지', '2099년 미래 디스토피아', '1980년대 네오 느와르'], required: true, step: 2 },
                'step2-env-type': { label: '공간 성격', token: '{공간 성격}', type: 'input', placeholder: '예: 거대하게 솟아오른 버려진 마법 성의 성탑 외부', required: true, step: 2 },
                'step2-art': { label: '미술 톤앤매너', token: '{미술 톤앤매너}', type: 'input', placeholder: '예: 낡은 석조 질감, 부서진 쇠사슬과 이끼 낀 조각상', step: 2 },
                'step2-weather': { label: '날씨 / 환경 조건', token: '{날씨/환경}', type: 'input', placeholder: '예: 폭우가 몰아치며 간간이 번개가 치는 어두운 밤', step: 2 },
                'step2-color': { label: '지배적인 색감', token: '{지배적인 색감}', type: 'input', placeholder: '예: 차가운 블루 톤과 안개가 낀 다크 그레이, 번개의 푸른 백색광', tags: ['차가운 블루와 그레이', '네온 핑크와 시안', '바랜 세피아와 먼지 가득한 오렌지'], step: 2 },
                'step2-avoid-mood': { label: '피해야 할 분위기', token: '{피해야 할 분위기}', type: 'input', placeholder: '예: 지나치게 밝고 화사함, 현대식 조명 느낌', step: 2 },
                // Step 3
                'step3-character': { label: '인물 유형 / 외모', token: '{인물 유형/외모}', type: 'input', placeholder: '예: 검은색 두꺼운 후드 망토를 쓴 흉터가 있는 기사', required: true, step: 3 },
                'step3-role': { label: '역할 / 성격', token: '{역할/성격}', type: 'input', placeholder: '예: 성을 수호하는 외로운 감시자', step: 3 },
                'step3-clothing': { label: '착용 의상', token: '{착용 의상}', type: 'input', placeholder: '예: 룬 문자가 새겨진 낡고 긁힌 어두운 철제 판금 갑옷', step: 3 },
                'step3-facial': { label: '얼굴 표정 / 감정 상태', token: '{얼굴 표정/감정 상태}', type: 'input', placeholder: '예: 무겁고 비장하며, 어둠 속을 노려보는 단호한 눈빛', step: 3 },
                'step3-avoid-char': { label: '피해야 할 캐릭터 묘사', token: '{피해야 할 캐릭터 묘사}', type: 'input', placeholder: '예: 과도하게 깔끔한 외모, 젊고 명랑한 느낌', step: 3 },
                // Step 4
                'step4-prop': { label: '핵심 소품', token: '{핵심 소품}', type: 'input', placeholder: '예: 푸른 빛으로 미세하게 떨리며 고대 기호가 반짝이는 룬 검', step: 4 },
                'step4-vfx': { label: '초현실적 / SF / 판타지 효과', token: '{초현실적/SF/판타지 효과}', type: 'input', placeholder: '예: 마법 룬 주위로 생기는 푸른 스파크와 가벼운 공중 부양 먼지 효과', step: 4 },
                'step4-logo-policy': { label: '제품 / 로고 포함 여부', token: '{제품/로고 포함 여부}', type: 'input', placeholder: '예: 어떠한 브랜드 로고나 인공 텍스트도 들어가지 않음', step: 4 },
                'step4-avoid-prop': { label: '피해야 할 소품', token: '{피해야 할 소품}', type: 'input', placeholder: '예: 미래지향적인 홀로그램이나 현대식 기기류', step: 4 },
                // Step 5
                'step5-shooting-place': { label: '주요 촬영지', token: '{주요 촬영지}', type: 'input', placeholder: '예: 부서진 돌기둥과 무너진 아치문이 있는 성곽 테라스', required: true, step: 5 },
                'step5-landmark': { label: '주요 랜드마크', token: '{주요 랜드마크}', type: 'input', placeholder: '예: 화면 먼 배경에 우뚝 솟아 구름을 찌르는 마탑의 실루엣', step: 5 },
                'step5-architecture': { label: '인테리어 / 건축 스타일', token: '{인테리어/건축 스타일}', type: 'input', placeholder: '예: 고딕 양식의 거대하고 위압적인 석조 기둥들', step: 5 },
                'step5-sp-lighting': { label: '특수 조명', token: '{특수 조명}', type: 'input', placeholder: '예: 구름 사이 달빛의 역광과 번개의 순간적인 섬광 조명', step: 5 },
                'step5-time': { label: '시간대', token: '{시간대}', type: 'input', placeholder: '예: 뇌우가 불어닥치는 폭풍전야의 캄캄한 밤', step: 5 },
                'step5-space-mood': { label: '전체 공간 분위기', token: '{전체 공간 분위기}', type: 'input', placeholder: '예: 저주를 받아 방치된 음산하고 위엄 있는 분위기', step: 5 },
                // Step 6
                'step6-cinematic-style': { label: '시네마틱 비주얼 스타일', token: '{시네마틱 비주얼 스타일}', type: 'input', placeholder: '예: 어둡고 묵직한 하이 엔드 다크 시네마틱 필름 룩', required: true, step: 6 },
                'step6-edit-speed': { label: '화면 편집 속도', token: '{화면 편집 속도}', type: 'input', placeholder: '예: 점진적으로 긴장감이 고조되는 느린 호흡에서 폭발하듯 빨라지는 템포', step: 6 },
                'step6-cam-move': { label: '카메라 무빙', token: '{카메라 무빙}', type: 'input', placeholder: '예: 웅장한 크레인 샷 및 서서히 다가가는 톨리 인(Dolly In)', step: 6 },
                'step6-depth': { label: '초점 / 피사계 심도', token: '{초점/피사계 심도}', type: 'input', placeholder: '예: 안개 속에 아스라히 피사체가 떠오르는 매우 얕은 피사계 심도', step: 6 },
                'step6-transition-vfx': { label: '컷 전환 및 VFX 연출', token: '{컷 전환 및 VFX 연출}', type: 'input', placeholder: '예: 번개가 치는 매치 컷 전환과 슬로우모션 먼지 흩날림 연출', step: 6 },
                'step6-avoid-visual': { label: '피해야 할 비주얼', token: '{피해야 할 비주얼}', type: 'input', placeholder: '예: 과도한 채도, 조잡한 CG 느낌, 홈비디오 같은 화면 질감', step: 6 },
                // Step 7
                'step7-scene1': { label: '00:00 – 00:02 장면', token: '{00:00–00:02 장면}', type: 'textarea', placeholder: '첫 장면에 대한 구체적 묘사를 입력하세요', required: true, step: 7 },
                'step7-scene2': { label: '00:02 – 00:04 장면', token: '{00:02–00:04 장면}', type: 'textarea', placeholder: '두 번째 장면에 대한 묘사', step: 7 },
                'step7-scene3': { label: '00:04 – 00:06 장면', token: '{00:04–00:06 장면}', type: 'textarea', placeholder: '세 번째 장면에 대한 묘사', step: 7 },
                'step7-scene4': { label: '00:06 – 00:08 장면', token: '{00:06–00:08 장면}', type: 'textarea', placeholder: '네 번째 장면에 대한 묘사', step: 7 },
                'step7-scene5': { label: '00:08 – 00:10 장면', token: '{00:08–00:10 장면}', type: 'textarea', placeholder: '다섯 번째 장면에 대한 묘사', step: 7 },
                'step7-scene6': { label: '00:10 – 00:12 장면', token: '{00:10–00:12 장면}', type: 'textarea', placeholder: '여섯 번째 장면에 대한 묘사', step: 7 },
                'step7-scene7': { label: '00:12 – 00:14 장면', token: '{00:12–00:14 장면}', type: 'textarea', placeholder: '일곱 번째 장면에 대한 묘사', step: 7 },
                'step7-scene8': { label: '00:14 – 00:15 장면', token: '{00:14–00:15 장면}', type: 'textarea', placeholder: '여덟 번째 장면에 대한 묘사', step: 7 },
                // Step 8
                'step8-orch-bgm': { label: '웅장한 오케스트라 BGM', token: '{웅장한 오케스트라 BGM}', type: 'input', placeholder: '예: 북소리와 파이프 오르간이 섞인 웅장하고 무거운 다크 에픽 음악', step: 8 },
                'step8-sfx': { label: '사운드 이펙트(SFX)', token: '{사운드 이펙트(SFX)}', type: 'input', placeholder: '예: 강렬한 천둥소리, 쇠사슬이 긁히는 금속성 저음 효과음', step: 8 },
                'step8-ambient': { label: '환경음', token: '{환경음}', type: 'input', placeholder: '예: 휘몰아치는 거센 바람과 빗소리', step: 8 },
                'step8-narration': { label: '내레이션/보이스오버', token: '{내레이션/보이스오버}', type: 'input', placeholder: '예: 낮고 거친 독백식 내레이션', step: 8 },
                'step8-dialogue': { label: '대사 여부', token: '{대사 여부}', type: 'input', placeholder: '예: 없음', step: 8 },
                // Step 9
                'step9-avoid-errors': { label: '피해야 할 시각적 왜곡', token: '{피해야 할 시각적 왜곡}', type: 'textarea', placeholder: '예: 부자연스럽게 뒤틀린 갑옷 형태, 모델의 얼굴 마스크 흔들림', step: 9 },
                'step9-avoid-txt': { label: '글자/자막 노출 금지 규칙', token: '{글자/자막 노출 금지}', type: 'input', placeholder: '예: 화면 하단에 알 수 없는 워터마크나 AI 생성 텍스트 표시 금지', step: 9 },
                'step9-goal': { label: '최종 목표', token: '{목표}', type: 'input', placeholder: '예: 영화 예고편 스타일의 시네마틱 트레일러 프롬프트 완성', required: true, step: 9 }
            },
            template: `[영상 기본 정보]
{영상 길이}짜리 {영상 비율} {영상 장르} 영상을 만들어줘.
목적은 {영상 목적}이며, 전체 분위기는 {전체 분위기}이다.

[세계관 및 배경]
이 영상의 세계관은 {시대 배경}을 무대로 한다.
공간은 {공간 성격}의 형태를 띠고 있으며, 전체적인 미술은 {미술 톤앤매너}이다.
날씨와 환경 조건은 {날씨/환경}이며, 화면의 지배적인 색감은 {지배적인 색감}이다.
{피해야 할 분위기}는 철저히 배제한다.

[등장인물]
주요 등장인물은 {인물 유형/외모}의 특징을 지녔으며, {역할/성격}의 인물이다.
캐릭터는 {착용 의상}을 입고 있으며, {얼굴 표정/감정 상태}를 짓고 있다.
{피해야 할 캐릭터 묘사}는 피한다.

[소품 및 효과]
영상에는 주요 소품으로 {핵심 소품}이 등장한다.
시각적으로 {초현실적/SF/판타지 효과} 연출이 포함된다.
화면 구성상 {제품/로고 포함 여부}를 준수한다.
{피해야 할 소품}은 등장하지 않는다.

[상세 장소]
구체적인 촬영지는 {주요 촬영지}이며, 핵심이 되는 지점은 {주요 랜드마크}이다.
인테리어와 건축 스타일은 {인테리어/건축 스타일}이며, {특수 조명}이 비춘다.
시간대는 {시간대}이고, 전체적으로 {전체 공간 분위기}가 감돈다.

[시각 스타일]
영상은 {시네마틱 비주얼 스타일} 스타일을 띤다.
{화면 편집 속도}, {카메라 무빙}, {초점/피사계 심도}를 적용한다.
장면 전환 및 시각 연출은 {컷 전환 및 VFX 연출}로 표현한다.
{피해야 할 비주얼}은 피한다.

[타임라인]
00:00–00:02
{00:00–00:02 장면}

00:02–00:04
{00:02–00:04 장면}

00:04–00:06
{00:04–00:06 장면}

00:06–00:08
{00:06–00:08 장면}

00:08–00:10
{00:08–00:10 장면}

00:10–00:12
{00:10–00:12 장면}

00:12–00:14
{00:12–00:14 장면}

00:14–00:15
{00:14–00:15 장면}

[오디오]
배경음악은 {웅장한 오케스트라 BGM}.
효과음은 {사운드 이펙트(SFX)}.
환경음은 {환경음}.
내레이션은 {내레이션/보이스오버}. 대사는 {대사 여부}.

[금지 요소]
자막 없음.
화면에 글자 없음.
읽을 수 있는 텍스트 없음.
{피해야 할 시각적 왜곡}
{글자/자막 노출 금지}

[최종 목표]
{목표}`,
            examples: {
                'step1-length': '30초',
                'step1-ratio': '가로형 16:9',
                'step1-genre': '다크 판타지 트레일러',
                'step1-purpose': '신작 어드벤처 게임 오프닝 시네마틱 트레일러',
                'step1-mood': '웅장하고 미스터리하며 긴장감 넘치는 분위기',
                'step1-platform': '유튜브 홍보 및 스팀 게임 페이지 상단',
                'step2-era': '중세 고딕 판타지 시대',
                'step2-env-type': '거대하게 솟아오른 버려진 마법 성의 성탑 외부 테라스',
                'step2-art': '낡은 어두운 석조 질감, 부서진 쇠사슬과 군데군데 낀 이끼',
                'step2-weather': '폭우가 몰아치며 저 멀리 간간이 붉은색 번개가 내리치는 폭풍우 치는 밤',
                'step2-color': '차가운 딥 블루 톤과 안개가 낀 다크 그레이, 번개의 순간적인 붉은 백색광',
                'step2-avoid-mood': '화사하고 평화로움, 현대적인 네온 조명 스타일',
                'step3-character': '얼굴 절반에 깊은 칼자국 흉터가 있고 백발이 섞인 40대 후반의 늙고 지친 수호 기사',
                'step3-role': '성을 지키며 저주를 풀 열쇠를 찾는 마지막 고독한 수호 기사',
                'step3-clothing': '룬 문자가 새겨져 은은히 빛나는 어두운 색 강철 판금 갑옷과 너덜너덜한 검은 후드 망토',
                'step3-facial': '비장함과 매서운 분노가 절반씩 섞인 굳게 다문 입술, 어둠을 노려보는 단호한 눈빛',
                'step3-avoid-char': '과하게 정돈되고 반짝이는 피부, 아이돌 같은 외모, 가벼운 감정 표현',
                'step4-prop': '손잡이 끝에서 푸른 서리가 내뿜어지고 검날에 고대 각인이 붉게 빛나는 거대한 룬 롱소드',
                'step4-vfx': '룬 검 주변으로 타오르는 연기와 눈송이들이 가볍게 둥둥 떠다니는 저중력 마법 효과',
                'step4-logo-policy': '어떠한 현대식 브랜드 상표, 알파벳 로고, 인공 워터마크도 생성을 전면 배제함',
                'step4-avoid-prop': '현대식 시계, 홀로그램 인터페이스, 디지털 스크린 장치류',
                'step5-shooting-place': '안개가 두껍게 내려앉은 허물어지고 오래된 대리석 난간 주변 성곽',
                'step5-landmark': '구름 너머 번개 뒤로 희미하고도 위협적인 윤곽을 내뿜는 봉인된 마왕의 거대 기괴한 성체',
                'step5-architecture': '위압적이고 거대하게 배치된 고딕풍 거대 돌기둥 기둥들',
                'step5-sp-lighting': '안개 사이로 은은하게 투과되는 보름달의 차가운 백색 백라이트와 번개의 점멸 스폿 조명',
                'step5-time': '자정 무렵 칠흑 같은 어두운 새벽 밤',
                'step5-space-mood': '오랫동안 버려진 역사와 음산한 공포, 긴장감이 공존하는 압도적인 공간',
                'step6-cinematic-style': '무겁고 영화적인 질감이 두껍게 들어간 하이엔드 8K 영화용 필름 룩',
                'step6-edit-speed': '처음엔 정적이고 느린 정밀 컷으로 시작해 기사가 칼을 뽑아들며 긴박하게 속도감이 상승함',
                'step6-cam-move': '천천히 피사체를 따라 좁혀가는 슬로우 팔로우 트래킹 샷과 웅장한 부감 샷',
                'step6-depth': '기사의 눈에만 초점이 선명하게 맺히고 배경의 폭풍우는 몽환적으로 뭉개지는 얕은 심도',
                'step6-transition-vfx': '번쩍이는 번개 섬광과 함께 교차 편집되는 화면 전환 및 비에 젖어 흩날리는 재 연출',
                'step6-avoid-visual': '지나치게 과장된 원색 표현, 홈비디오 핸드폰 카메라 무빙, 조악하고 단순한 3D 그래픽 렌더링 품질',
                'step7-scene1': '안개 가득한 고딕풍 성 난간 아래로 거센 빗방울이 떨어지는 클로즈업. 천천히 카메라가 위로 틸트업한다.',
                'step7-scene2': '비에 젖은 기사의 무거운 철제 군화 발걸음이 돌바닥을 디디며 물웅덩이에 물방울이 튀는 모습을 매크로샷으로 잡음.',
                'step7-scene3': '기사가 자신의 거대한 검자루를 잡은 가죽 장갑 낀 손을 슬로우모션으로 가깝게 포착.',
                'step7-scene4': '기사의 얼굴 클로즈업. 흉터 자국 사이로 땀과 빗방울이 흘러내리며 굳센 눈빛이 카메라 방향을 향해 조용히 올라간다.',
                'step7-scene5': '기사가 검을 쓱 뽑아들자, 룬 문자가 활성화되며 불꽃 같은 붉은 잔상이 어둠 속에 궤적을 그리며 뻗어나간다.',
                'step7-scene6': '주변의 돌가루와 낙엽들이 칼의 마법력에 반응해 공중으로 천천히 역방향으로 둥둥 떠오른다.',
                'step7-scene7': '멀리 서 있는 거대 성체에서 붉은빛이 기둥처럼 하늘로 뿜어져 올라가는 웅장한 와이드 카메라 풀샷.',
                'step7-scene8': '기사가 기괴한 성을 바라보며 검을 쥐고 비장하게 걸어 나가는 뒷모습 실루엣 샷.',
                'step8-orch-bgm': '무거운 저음의 에픽 타악기와 웅장하고 신비로운 파이프 오르간이 융합된 다크 오케스트라 사운드 트랙',
                'step8-sfx': '지축을 흔드는 강렬한 천둥소리, 칼집에서 룬 검이 스르륵 뽑혀 나오는 마법적 고음 메탈 마찰음',
                'step8-ambient': '뺨을 때리는 억수 같은 빗소리와 바람 소리',
                'step8-narration': '무겁고 저음의 기사의 짧은 독백 보이스오버 "이 저주받은 성이 드디어 마지막 밤을 맞이하는구나."',
                'step8-dialogue': '없음',
                'step9-avoid-errors': '얼굴 피부가 인형처럼 바스러지거나 턱선 붕괴, 철제 갑옷 부분이 흔들릴 때 흐물거리는 그래픽 아티팩트',
                'step9-avoid-txt': '화면 상하단에 불필요한 시네마스코프 검은 레터박스를 인공적으로 그리지 말고, 자막 폰트 생성 일절 금지',
                'step9-goal': 'AI 비디오 생성 툴에서 실제 영화 시네마틱 트레일러로 인식하게 설계된 초고품질 연출용 프롬프트 조립 완성'
            }
        },
        vlog: {
            title: '브이로그 / 일상',
            desc: '자연스러운 핸드헬드 연출, 내추럴한 주인공 묘사, 편안한 일상 인테리어와 ASMR이 결합된 따뜻한 영상 제작에 알맞은 프롬프트입니다.',
            icon: 'fa-camera-retro',
            steps: [
                { num: 1, title: '기본 정보', badge: '영상 기본 정보 정하기' },
                { num: 2, title: '주인공', badge: '주인공 인물 설정' },
                { num: 3, title: '데일리 룩', badge: '의상 및 액세서리 스타일' },
                { num: 4, title: '소품 & 기기', badge: '일상 소품 및 라이프스타일 템' },
                { num: 5, title: '장소 & 동선', badge: '촬영 공간과 조명 무드' },
                { num: 6, title: '촬영 스타일', badge: '자연스러운 브이로그 카메라 워킹' },
                { num: 7, title: '타임라인', badge: '일상 타임라인 순서 구성' },
                { num: 8, title: '오디오', badge: 'ASMR 및 일상 오디오 설정' },
                { num: 9, title: '금지 요소', badge: '금지 제한 및 최종 목표' }
            ],
            fields: {
                // Step 1
                'step1-length': { label: '영상 길이', token: '{영상 길이}', type: 'input', placeholder: '예: 15초', tags: ['15초', '30초', '60초'], required: true, step: 1 },
                'step1-ratio': { label: '영상 비율', token: '{영상 비율}', type: 'input', placeholder: '예: 세로형 9:16', tags: ['세로형 9:16', '가로형 16:9', '정방형 1:1'], required: true, step: 1 },
                'step1-genre': { label: '영상 장너', token: '{영상 장르}', type: 'input', placeholder: '예: 일상 라이프스타일 브이로그', tags: ['감성 카페 브이로그', '미니멀리스트 룸투어', '도쿄 여행 브이로그'], required: true, step: 1 },
                'step1-purpose': { label: '촬영 목적', token: '{촬영 목적}', type: 'input', placeholder: '예: 감성적인 미니멀리스트의 아침 루틴 브이로그', required: true, step: 1 },
                'step1-mood': { label: '전체 분위기', token: '{전체 분위기}', type: 'input', placeholder: '예: 따뜻하고 아늑하며 평화롭고 자연스러운 무드', required: true, step: 1 },
                'step1-platform': { label: '타깃 플랫폼', token: '{타깃 플랫폼}', type: 'input', placeholder: '예: 유튜브 쇼츠, 인스타그램 릴스', step: 1 },
                // Step 2
                'step2-gender': { label: '성별', token: '{성별}', type: 'input', placeholder: '예: 여성', tags: ['여성', '남성'], required: true, step: 2 },
                'step2-age': { label: '나이대', token: '{나이대}', type: 'input', placeholder: '예: 20대 중후반', tags: ['20대 중후반', '30대 초반'], step: 2 },
                'step2-nationality': { label: '국적 / 이미지', token: '{국적/이미지}', type: 'input', placeholder: '예: 친근하고 수수한 한국 여성 이미지', required: true, step: 2 },
                'step2-mood-char': { label: '메인 캐릭터 느낌', token: '{메인 캐릭터 느낌}', type: 'input', placeholder: '예: 화장기 없어도 수수하게 맑으며 부드러운 인상', step: 2 },
                'step2-hair-makeup': { label: '헤어 / 메이크업 스타일', token: '{헤어/메이크업 스타일}', type: 'input', placeholder: '예: 느슨하게 묶은 로우번 헤어', step: 2 },
                'step2-friendly': { label: '친근감 요소', token: '{친근감 요소}', type: 'input', placeholder: '예: 카메라를 지그시 보며 수줍게 미소 짓거나 자연스런 아이 콘택트', step: 2 },
                'step2-avoid-mood': { label: '피해야 할 느낌', token: '{피해야 할 느낌}', type: 'input', placeholder: '예: 너무 짙은 스모키 메이크업, 전문 광고 모델 같은 화려함', step: 2 },
                // Step 3
                'step3-outfit': { label: '의상 스타일', token: '{의상 스타일}', type: 'input', placeholder: '예: 넉넉한 핏의 아이보리색 오버사이즈 면 셔츠', step: 3 },
                'step3-acc': { label: '착용 액세서리', token: '{착용 액세서리}', type: 'input', placeholder: '예: 미니멀한 얇은 실버 실반지와 가죽 밴드 시계', step: 3 },
                'step3-outfit-tone': { label: '전체적인 옷 톤앤매너', token: '{전체적인 옷 톤앤매너}', type: 'input', placeholder: '예: 뉴트럴 톤의 편안한 홈웨어 스타일링', step: 3 },
                'step3-avoid-clothing': { label: '피해야 할 의상', token: '{피해야 할 의상}', type: 'input', placeholder: '예: 명품 로고 패턴의 상의, 너무 정돈된 정장', step: 3 },
                // Step 4
                'step4-prop': { label: '주요 일상 소품', token: '{주요 일상 소품}', type: 'input', placeholder: '예: 모락모락 김이 올라오는 하얀색 머그컵', step: 4 },
                'step4-device': { label: '라이프스타일 기기', token: '{라이프스타일 기기}', type: 'input', placeholder: '예: 원목 테이블 위에 놓인 메탈릭 실버 노트북', step: 4 },
                'step4-text-logo': { label: '로고 / 텍스트 노출 정책', token: '{로고/텍스트 노출 정책}', type: 'input', placeholder: '예: 텀블러나 머그컵에 선명한 기호나 글자가 인쇄되지 않은 무지 제품', step: 4 },
                'step4-avoid-vlog': { label: '피해야 할 느낌', token: '{피해야 할 느낌}', type: 'input', placeholder: '예: 지나치게 정돈되어 정형화된 쇼룸 가구 세팅 분위기', step: 4 },
                // Step 5
                'step5-shooting-place': { label: '장소 범위 (카페, 거리 등)', token: '{장소 범위(카페, 거리 등)}', type: 'input', placeholder: '예: 아침 햇살이 부드럽게 스며드는 우드 앤 화이트 톤의 아늑한 침실방', required: true, step: 5 },
                'step5-space-mood': { label: '공간 무드', token: '{공간 무드}', type: 'input', placeholder: '예: 미니멀하면서도 초록색 식물이 배치되어 싱그러운 생기가 도는 공간', step: 5 },
                'step5-interior': { label: '인테리어 스타일', token: '{인테리어 스타일}', type: 'input', placeholder: '예: 따뜻하고 아기자기한 이케아 스타일의 우드 가구들', step: 5 },
                'step5-light': { label: '자연광 / 실내 조명', token: '{자연광/실내 조명}', type: 'input', placeholder: '예: 창문의 시폰 커튼을 통과해 가구에 비치는 은은하고 긴 아침 햇살', step: 5 },
                'step5-time': { label: '시간대', token: '{시간대}', type: 'input', placeholder: '예: 주말 이른 아침 8시경', step: 5 },
                'step5-space-tone': { label: '전체 장소 분위기', token: '{전체 장소 분위기}', type: 'input', placeholder: '예: 평화롭고 한적한 주말 오전의 따스한 가정집 분위기', step: 5 },
                // Step 6
                'step6-handheld': { label: '핸드헬드 / 자연스러운 카메라 워킹', token: '{핸드헬드/자연스러운 카메라 워킹}', type: 'input', placeholder: '예: 약간의 미세한 흔들림이 섞인 내추럴한 핸드헬드 기법', required: true, step: 6 },
                'step6-tempo': { label: '편집 템포', token: '{편집 템포}', type: 'input', placeholder: '예: 여유롭고 차분하며 장면당 3-4초 머무는 호흡이 긴 편집', step: 6 },
                'step6-filter': { label: '렌즈 필터 / 감성 톤', token: '{렌즈 필터/감성 톤}', type: 'input', placeholder: '예: 콘트라스트가 낮고 노란 아날로그 태양광 온기가 감도는 웜 톤 필터', step: 6 },
                'step6-skin-express': { label: '현실적인 피부 및 화면 묘사', token: '{현실적인 피부 및 화면 묘사}', type: 'input', placeholder: '예: 모공과 잔머리가 자연스레 포착되며 과도한 모자이크 블러 처리가 없는 생생하고 사실적인 질감', step: 6 },
                'step6-transition': { label: '전환 기법', token: '{전환 기법}', type: 'input', placeholder: '예: 카메라 렌즈를 쓸어내리거나 프레임 안을 소품으로 가렸다가 넘어가는 기법', step: 6 },
                'step6-avoid-cam': { label: '피해야 할 촬영 스타일', token: '{피해야 할 촬영 스타일}', type: 'input', placeholder: '예: 드론 공중 촬영 샷, 현란하고 어지러운 트랜지션', step: 6 },
                // Step 7
                'step7-scene1': { label: '00:00 – 00:02 장면', token: '{00:00–00:02 장면}', type: 'textarea', placeholder: '첫 장면에 대한 구체적 묘사를 입력하세요', required: true, step: 7 },
                'step7-scene2': { label: '00:02 – 00:04 장면', token: '{00:02–00:04 장면}', type: 'textarea', placeholder: '두 번째 장면에 대한 묘사', step: 7 },
                'step7-scene3': { label: '00:04 – 00:06 장면', token: '{00:04–00:06 장면}', type: 'textarea', placeholder: '세 번째 장면에 대한 묘사', step: 7 },
                'step7-scene4': { label: '00:06 – 00:08 장면', token: '{00:06–00:08 장면}', type: 'textarea', placeholder: '네 번째 장면에 대한 묘사', step: 7 },
                'step7-scene5': { label: '00:08 – 00:10 장면', token: '{00:08–00:10 장면}', type: 'textarea', placeholder: '다섯 번째 장면에 대한 묘사', step: 7 },
                'step7-scene6': { label: '00:10 – 00:12 장면', token: '{00:10–00:12 장면}', type: 'textarea', placeholder: '여섯 번째 장면에 대한 묘사', step: 7 },
                'step7-scene7': { label: '00:12 – 00:14 장면', token: '{00:12–00:14 장면}', type: 'textarea', placeholder: '일곱 번째 장면에 대한 묘사', step: 7 },
                'step7-scene8': { label: '00:14 – 00:15 장면', token: '{00:14–00:15 장면}', type: 'textarea', placeholder: '여덟 번째 장면에 대한 묘사', step: 7 },
                // Step 8
                'step8-bgm': { label: '이지리스닝 BGM', token: '{이지리스닝 BGM}', type: 'input', placeholder: '예: 로파이(Lo-fi) 재즈풍의 기타 선율이 나지막이 깔리는 배경음악', step: 8 },
                'step8-asmr': { label: '일상 효과음(ASMR)', token: '{일상 효과음(ASMR)}', type: 'input', placeholder: '예: 커피 필터 내리는 소리, 연필로 일기장에 글 쓰는 종이 마찰음', step: 8 },
                'step8-ambient': { label: '현장 소음(Ambient)', token: '{현장 소음(Ambient)}', type: 'input', placeholder: '예: 창밖 멀리서 들려오는 나직한 아침 지저귐소리', step: 8 },
                'step8-narration': { label: '내레이션 여부', token: '{내레이션 여부}', type: 'input', placeholder: '예: 속삭이듯 차분하고 다정한 조용한 한국어 독백 보이스오버', step: 8 },
                'step8-dialogue': { label: '실제 현장 대사 여부', token: '{실제 현장 대사 여부}', type: 'input', placeholder: '예: 없음', step: 8 },
                // Step 9
                'step9-avoid-sfx': { label: '과도한 특수효과 금지 정책', token: '{과도한 특수효과 금지}', type: 'textarea', placeholder: '예: 화면 번쩍임이나 네온 빛 등 상업 광고 같은 연출 금지', step: 9 },
                'step9-avoid-distort': { label: '화면 왜곡 금지 정책', token: '{화면 왜곡 금지}', type: 'input', placeholder: '예: 광각 렌즈 왜곡으로 얼굴이 오이처럼 늘어나는 현상 절대 배제', step: 9 },
                'step9-avoid-filter': { label: '인공적인 필터 배제 규칙', token: '{인공적인 필터 배제}', type: 'input', placeholder: '예: 조잡한 스티커 효과, 인위적인 뷰티 앱 톤 필터 자제', step: 9 },
                'step9-goal': { label: '최종 목표', token: '{목표}', type: 'input', placeholder: '예: 실제 사람이 찍어 올린 듯한 따스하고 리얼한 감성 브이로그 프롬프트 완성', required: true, step: 9 }
            },
            template: `[영상 기본 정보]
{영상 길이}짜리 {영상 비율} {영상 장르} 영상을 만들어줘.
목적은 {촬영 목적}이며, 전체 분위기는 {전체 분위기}이다.

[주인공]
주인공은 {성별} 모델이며 나이는 {나이대}이다.
{국적/이미지} 이미지를 지녔으며, 전체적으로 {메인 캐릭터 느낌}의 분위기를 풍긴다.
스타일링은 {헤어/메이크업 스타일}을 하고 있으며, {친근감 요소}를 보여준다.
{피해야 할 느낌}은 배제한다.

[의상]
주인공은 {의상 스타일}을 착용했다.
액세서리는 {착용 액세서리}이며, 전체 의상 톤앤매너는 {전체적인 옷 톤앤매너}이다.
{피해야 할 의상}은 피한다.

[소품 및 기기]
영상에는 {주요 일상 소품}이 자연스럽게 활용된다.
라이프스타일 기기로 {라이프스타일 기기}가 화면에 노출된다.
브랜드 로고와 텍스트 노출에 대해서는 {로고/텍스트 노출 정책}을 따른다.
{피해야 할 느낌}은 포함되지 않는다.

[장소 및 동선]
촬영 공간은 {장소 범위(카페, 거리 등)}이며, 장소의 무드는 {공간 무드}이다.
인테리어 스타일은 {인테리어 스타일}이고, 조명은 {자연광/실내 조명}이 비춘다.
시간대는 {시간대}이며, 전체적으로 {전체 장소 분위기}를 자아낸다.

[촬영 스타일]
비주얼 연출은 {핸드헬드/자연스러운 카메라 워킹} 스타일로 촬영된다.
{편집 템포}의 속도감과 {렌즈 필터/감성 톤}을 지니고 있다.
피부와 피사체 표현은 {현실적인 피부 및 화면 묘사}를 적용한다.
장면 전환은 {전환 기법}을 사용한다.
{피해야 할 촬영 스타일}은 피한다.

[타임라인]
00:00–00:02
{00:00–00:02 장면}

00:02–00:04
{00:02–00:04 장면}

00:04–00:06
{00:04–00:06 장면}

00:06–00:08
{00:06–00:08 장면}

00:08–00:10
{00:08–00:10 장면}

00:10–00:12
{00:10–00:12 장면}

00:12–00:14
{00:12–00:14 장면}

00:14–00:15
{00:14–00:15 장면}

[오디오]
배경음악은 {이지리스닝 BGM}.
효과음은 {일상 효과음(ASMR)}.
현장음은 {현장 소음(Ambient)}.
내레이션은 {내레이션 여부}. 대사는 {실제 현장 대사 여부}.

[금지 요소]
자막 없음.
화면에 글자 없음.
{과도한 특수효과 금지}
{화면 왜곡 금지}
{인공적인 필터 배제}

[최종 목표]
{목표}`,
            examples: {
                'step1-length': '15초',
                'step1-ratio': '세로형 9:16',
                'step1-genre': '일상 라이프스타일 브이로그',
                'step1-purpose': '감성적인 미니멀리스트의 주말 아침 루틴 브이로그',
                'step1-mood': '따뜻하고 아늑하며 평화롭고 자연스러운 웜톤 분위기',
                'step1-platform': '유튜브 쇼츠 및 인스타그램 릴스',
                'step2-gender': '여성',
                'step2-age': '20대 중후반',
                'step2-nationality': '수수한 분위기의 친근한 한국 여성 모델',
                'step2-mood-char': '화장기가 옅어 자연스럽고 온화하며 깨끗한 동네 이웃 같은 이미지',
                'step2-hair-makeup': '로우번 스타일로 대충 올려 묶어 몇 가닥 잔머리가 흘러내린 머리',
                'step2-friendly': '책장을 넘기다 카메라를 힐긋 보며 조용히 미소 짓는 등 편안한 아이 콘택트',
                'step2-avoid-mood': '인위적인 성형 미인 느낌, 풀메이크업 얼굴, 차가운 눈빛과 자세',
                'step3-outfit': '여유롭고 부드러운 코튼 소재의 아이보리색 오버사이즈 셔츠와 베이지 코튼 팬츠',
                'step3-acc': '은은한 실버 실반지 하나와 브라운 가죽 스트랩의 클래식 손목시계',
                'step3-outfit-tone': '내추럴한 뉴트럴 톤의 편안한 일상 캐주얼 룩',
                'step3-avoid-clothing': '명품 패턴이 눈에 띄게 큰 옷, 몸에 타이트하게 붙는 피트한 가죽 자켓',
                'step4-prop': '도자기 재질의 둥근 무늬가 없는 연베이지 머그컵에서 하얀 따뜻한 김이 피어오르는 모양',
                'step4-device': '원목 책상 한쪽에 펼쳐져 자연스럽게 대기 모드로 화면이 켜져 있는 태블릿 PC',
                'step4-text-logo': '식기나 머그컵에 로고 상표명이 하나도 노출되지 않도록 전면 배제 처리',
                'step4-avoid-vlog': '마치 오피스 전시장에 진열된 기기 같은 정형화된 일직선 배치 구도',
                'step5-shooting-place': '창가에 시폰 커튼이 드리워져 아침 햇살이 부드럽게 반사되는 작은 우드 가구 인테리어 침실방',
                'step5-space-mood': '창문 앞에 초록 몬스테라 잎이 놓여 따뜻하고 생명력 가득한 안온한 공간 무드',
                'step5-interior': '원목 화장대, 베이지 패브릭 침구류와 파스텔톤 전등 갓',
                'step5-light': '시폰 커튼 사이로 길고 비스듬히 스며들어 방안 가구에 은은한 오렌지빛 그림자를 늘어뜨리는 햇살',
                'step5-time': '주말 이른 오전 8시 30분',
                'step5-space-tone': '가정적이고 깨끗하지만 사람의 따스한 손길과 온기가 그대로 느껴지는 거주 공간 분위기',
                'step6-handheld': '자연스러운 기획 의도가 느껴지는 미세한 들림이 가미된 1인칭 핸드헬드 고정 카메라 워킹',
                'step6-tempo': '컷이 최소화되고 각 컷당 3초 이상 넉넉한 텀을 주며 천천히 전개되는 편안한 편집 흐름',
                'step6-filter': '콘트라스트를 살짝 낮추고 화이트 밸런스를 아날로그 따스함이 풍기는 색온도 5500K 수준으로 세팅한 포근한 감성 톤',
                'step6-skin-express': '빛을 받아 생겨나는 뽀얀 볼의 피부 질감과 자연스러운 주름이 그대로 보여지는 과보정 없는 묘사',
                'step6-transition': '화면이 기사의 손이나 커피컵으로 가려진 뒤 자연스레 다음 장면으로 이어되는 렌즈 오버랩 기법',
                'step6-avoid-cam': '어깨에 기구를 얹어 아주 딱딱하게 고정된 기계식 삼각대 패닝 샷이나 스펙터클한 액션캠 촬영 스타일',
                'step7-scene1': '창가 커튼을 부드럽게 옆으로 걷어내는 손길. 방 안으로 쏟아지는 아침 햇살을 카메라가 나란히 비춘다.',
                'step7-scene2': '원목 테이블 위에 하얀 머그컵이 놓여 있고, 주전자로 따뜻한 물을 쪼르르 붓는 드립 커피 내리는 손길 묘사.',
                'step7-scene3': '커피를 들고 침대 옆 일인용 원목 의자에 앉아 책을 한 장 넘기는 주인공의 나른하고 여유로운 얼굴 샷.',
                'step7-scene4': '책장이 스르륵 넘어가며 그 위에 떨어지는 햇빛의 그늘 매크로 샷.',
                'step7-scene5': '주인공이 창밖을 내다보다가 카메라를 향해 가볍게 웃어 보이며 머그컵을 입으로 가져간다.',
                'step7-scene6': '테이블 위에 올려진 연필로 다이어리에 무언가 쓱쓱 적어 내려가는 자연스런 위에서 내려다보는 탑뷰(Top-down) 샷.',
                'step7-scene7': '창가에 놓인 화분 잎사귀가 가벼운 아침 바람에 흔들리는 평화로운 정물 샷.',
                'step7-scene8': '가방을 챙기고 겉옷을 가볍게 걸친 채 거울 앞에 서서 오늘의 헤어 상태를 체크하고 뒤돌아 방을 나서는 뒷모습.',
                'step8-bgm': '가벼운 통기타 어쿠스틱 선율과 나직한 핑거 스냅 비트가 들어간 로파이 어쿠스틱 포크 음악',
                'step8-asmr': '커피 물 떨어지는 소리, 다이어리에 사락사락 연필로 쓰는 아날로그 종이 긁히는 사운드 소스 극대화',
                'step8-ambient': '아파트 바깥 공원의 조용한 새소리와 주말 오전의 고요한 침묵',
                'step8-narration': '속삭이듯 차분한 주인공의 보이스오버 "남들과 비교하지 않는 나만의 주말 오전이 비로소 시작됩니다."',
                'step8-dialogue': '없음',
                'step9-avoid-sfx': '빠른 컷 효과, 자막 플래시, 상업용 타이포그래피 이펙트 생성 전면 금지',
                'step9-avoid-distort': '렌즈 주변부가 둥글게 왜곡되는 광각 피쉬아이 렌즈 아티팩트 배제',
                'step9-avoid-filter': '인스타그램 스티커처럼 가공된 오버레이 효과나 화려한 파티클 필터 차단',
                'step9-goal': '따뜻한 감성을 극대화하여 보는 사람으로 하여금 실제 지인의 일상 영상을 시청하는 듯한 착각을 불어넣는 프롬프트 조립 완성'
            }
        }
    };

    // Elements DOM References
    const dynamicStepsNav = document.getElementById('dynamic-steps-nav');
    const dynamicFormContainer = document.getElementById('dynamic-form-container');
    const progressBar = document.getElementById('progress-bar');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const currentStepIndicator = document.getElementById('current-step-indicator');
    const previewContent = document.getElementById('prompt-preview-content');
    const finalOutputTextarea = document.getElementById('final-output-textarea');
    const toastContainer = document.getElementById('toast-container');

    /**
     * 1. Dynamic Rendering Engine
     * Renders step cards and navbar based on the selected video purpose configuration.
     */
    function renderApp() {
        const config = purposeConfigs[selectedPurpose];
        
        // --- 1.1 Render Sidebar Step Items ---
        let stepsHtml = '';
        config.steps.forEach(step => {
            const isActive = step.num === currentStep ? 'active' : '';
            // Check if step fields are fully completed to mark it
            const isCompleted = checkStepCompletion(step.num) ? 'completed' : '';
            
            stepsHtml += `
                <li class="nav-item ${isActive} ${isCompleted}" data-step="${step.num}">
                    <span class="step-num">${String(step.num).padStart(2, '0')}</span>
                    <span class="step-title">${step.title}</span>
                </li>
            `;
        });
        
        // Add final assemble step
        const isFinalActive = currentStep === 10 ? 'active' : '';
        stepsHtml += `
            <li class="nav-item ${isFinalActive}" data-step="10">
                <span class="step-num">10</span>
                <span class="step-title">최종 조립</span>
            </li>
        `;
        dynamicStepsNav.innerHTML = stepsHtml;

        // Re-bind click event to steps
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const targetStep = parseInt(item.getAttribute('data-step'));
                goToStep(targetStep);
            });
        });

        // --- 1.2 Render Form Cards (Steps 1 to 9) ---
        dynamicFormContainer.innerHTML = '';
        
        for (let s = 1; s <= 9; s++) {
            const stepConfig = config.steps[s - 1];
            const isStepActive = s === currentStep ? 'active' : '';
            
            let cardHtml = `
                <div class="step-card ${isStepActive}" id="step-card-${s}">
                    <div class="card-header">
                        <span class="badge">Step ${String(s).padStart(2, '0')}</span>
                        <h2>${stepConfig.badge}</h2>
                        ${s === 1 ? '<p>영상의 가장 기본적인 조건 및 목적을 설정합니다. 필수 항목(*)을 입력해주세요.</p>' : '<p>세부 속성을 설정하세요. 필수 항목(*) 외의 선택사항은 입력하지 않을 시 자동으로 "없음"으로 처리됩니다.</p>'}
                    </div>
                    <div class="card-body ${s === 7 ? 'scrollable-card-body' : ''}">
            `;

            // Step 1 Special Selector: Choose Video Purpose
            if (s === 1) {
                cardHtml += `
                    <div class="form-group purpose-selector-group">
                        <label>영상 제작 목적 선택 (전체 템플릿 전환) <span class="required-mark">*</span></label>
                        <div class="purpose-cards-grid">
                            ${Object.keys(purposeConfigs).map(key => {
                                const cfg = purposeConfigs[key];
                                const isSelected = key === selectedPurpose ? 'selected' : '';
                                return `
                                    <div class="purpose-select-card ${isSelected}" data-purpose="${key}">
                                        <div class="purpose-card-icon">
                                            <i class="fa-solid ${cfg.icon}"></i>
                                        </div>
                                        <div class="purpose-card-info">
                                            <h4>${cfg.title}</h4>
                                            <p>${cfg.desc}</p>
                                        </div>
                                        <div class="purpose-check"><i class="fa-solid fa-circle-check"></i></div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    <div class="divider"></div>
                `;
            }

            // Find all fields belonging to this step
            const fieldsInStep = Object.keys(config.fields).filter(id => config.fields[id].step === s);
            
            // Build form inputs
            fieldsInStep.forEach(id => {
                const f = config.fields[id];
                const value = formData[id] || '';
                const reqMark = f.required ? '<span class="required-mark">*</span>' : '';
                const placeholderText = f.required ? f.placeholder : `${f.placeholder} (미입력 시 '없음' 자동 적용)`;
                
                cardHtml += `
                    <div class="form-group">
                        <label for="${id}">${f.label}${reqMark}</label>
                `;
                
                if (f.type === 'textarea') {
                    cardHtml += `
                        <textarea id="${id}" rows="3" placeholder="${placeholderText}" class="form-control animate-focus">${value}</textarea>
                    `;
                } else {
                    cardHtml += `
                        <input type="text" id="${id}" placeholder="${placeholderText}" value="${value}" class="form-control animate-focus">
                    `;
                }

                // Build tags list. Optional fields get 'None/없음' at the beginning.
                const tagsList = f.tags ? [...f.tags] : [];
                if (!f.required) {
                    tagsList.unshift('없음');
                }

                if (tagsList.length > 0) {
                    cardHtml += `<div class="tags-suggest">`;
                    tagsList.forEach(tagText => {
                        cardHtml += `<span class="tag" data-target="${id}">${tagText}</span>`;
                    });
                    cardHtml += `</div>`;
                }

                cardHtml += `</div>`;
            });

            cardHtml += `
                    </div>
                </div>
            `;
            
            dynamicFormContainer.insertAdjacentHTML('beforeend', cardHtml);
        }

        // Re-bind Inputs Change Listener
        Object.keys(config.fields).forEach(id => {
            const inputEl = document.getElementById(id);
            if (inputEl) {
                inputEl.addEventListener('input', (e) => {
                    formData[id] = e.target.value;
                    updatePreview();
                    updateStepCompletedState(id);
                });
            }
        });

        // Re-bind Suggestion Tags Click Listener
        document.querySelectorAll('.tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const targetId = tag.getAttribute('data-target');
                const inputVal = tag.textContent;
                const inputEl = document.getElementById(targetId);
                if (inputEl) {
                    inputEl.value = inputVal;
                    formData[targetId] = inputVal;
                    updatePreview();
                    updateStepCompletedState(targetId);
                    inputEl.focus();
                }
            });
        });

        // Re-bind Purpose Cards Select Listener (Step 1)
        document.querySelectorAll('.purpose-select-card').forEach(card => {
            card.addEventListener('click', () => {
                const newPurpose = card.getAttribute('data-purpose');
                if (newPurpose !== selectedPurpose) {
                    if (hasAnyInputData()) {
                        if (confirm('영상의 목적을 변경하면 작성 중인 프롬프트 내용이 모두 지워집니다. 계속하시겠습니까?')) {
                            switchPurpose(newPurpose);
                        }
                    } else {
                        switchPurpose(newPurpose);
                    }
                }
            });
        });

        // Sync Step UI visibility & progress
        updateProgress();
    }

    /**
     * Check if a step has all REQUIRED fields filled
     */
    function checkStepCompletion(stepNum) {
        const config = purposeConfigs[selectedPurpose];
        const fieldsInStep = Object.keys(config.fields).filter(id => config.fields[id].step === stepNum);
        if (fieldsInStep.length === 0) return false;
        
        // Return true only if all fields with required: true are filled
        return fieldsInStep.every(id => {
            const f = config.fields[id];
            if (f.required) {
                return formData[id] && formData[id].trim() !== '';
            }
            return true; // Optional fields don't block checkmark
        });
    }

    function updateStepCompletedState(fieldId) {
        const config = purposeConfigs[selectedPurpose];
        const fieldMeta = config.fields[fieldId];
        if (!fieldMeta) return;

        const stepNum = fieldMeta.step;
        const isCompleted = checkStepCompletion(stepNum);

        const navItem = document.querySelector(`.nav-item[data-step="${stepNum}"]`);
        if (navItem) {
            if (isCompleted) {
                navItem.classList.add('completed');
            } else {
                navItem.classList.remove('completed');
            }
        }
    }

    /**
     * Switch Video Purpose configuration
     */
    function switchPurpose(newPurpose) {
        selectedPurpose = newPurpose;
        currentStep = 1;
        
        // Reset and rebuild formData keys
        formData = {};
        const config = purposeConfigs[selectedPurpose];
        Object.keys(config.fields).forEach(id => {
            formData[id] = '';
        });

        // Re-render UI and updates
        renderApp();
        updatePreview();
        showToast(`영상 목적이 '${config.title}'(으)로 변경되었습니다.`, 'info');
    }

    /**
     * Check if user has typed anything in the fields
     */
    function hasAnyInputData() {
        return Object.values(formData).some(val => val && val.trim() !== '');
    }

    /**
     * Update navigation steps
     */
    function goToStep(step) {
        if (step < 1 || step > totalSteps) return;

        // Hide current step, show target step card
        document.querySelectorAll('.step-card').forEach(card => card.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));

        const targetCard = document.getElementById(`step-card-${step}`);
        if (targetCard) targetCard.classList.add('active');

        const targetNavItem = document.querySelector(`.nav-item[data-step="${step}"]`);
        if (targetNavItem) targetNavItem.classList.add('active');

        currentStep = step;

        // Previous button state
        btnPrev.disabled = currentStep === 1;

        // Next button state / finish state
        if (currentStep === totalSteps) {
            btnNext.innerHTML = '완료 <i class="fa-solid fa-check"></i>';
            btnNext.style.background = 'linear-gradient(135deg, var(--color-success), #059669)';
            btnNext.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
            assembleFinalPrompt();
        } else {
            btnNext.innerHTML = '다음 <i class="fa-solid fa-chevron-right"></i>';
            btnNext.style.background = '';
            btnNext.style.boxShadow = '';
        }

        updateProgress();

        // Scroll top on the active step card body
        const activeCard = document.getElementById(`step-card-${currentStep}`);
        const cardBody = activeCard ? activeCard.querySelector('.card-body') : null;
        if (cardBody) cardBody.scrollTop = 0;
    }

    // Validation helper
    function getFirstMissingRequiredField() {
        const config = purposeConfigs[selectedPurpose];
        const fieldIds = Object.keys(config.fields).sort((a, b) => {
            return config.fields[a].step - config.fields[b].step;
        });

        for (const id of fieldIds) {
            const f = config.fields[id];
            if (f.required) {
                const value = formData[id];
                if (!value || value.trim() === '') {
                    return {
                        id: id,
                        step: f.step,
                        label: f.label
                    };
                }
            }
        }
        return null;
    }

    function handleValidationAndAlert() {
        const missing = getFirstMissingRequiredField();
        if (missing) {
            goToStep(missing.step);
            setTimeout(() => {
                const inputEl = document.getElementById(missing.id);
                if (inputEl) {
                    inputEl.focus();
                    inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    inputEl.classList.add('input-error');
                    setTimeout(() => {
                        inputEl.classList.remove('input-error');
                    }, 1000);
                }
            }, 350);
            
            showToast(`필수 항목 [${missing.label}]을(를) 입력해 주세요.`, 'error');
            return false;
        }
        return true;
    }

    // Navigation foot clicks
    btnNext.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            goToStep(currentStep + 1);
        } else {
            if (handleValidationAndAlert()) {
                showToast('모든 필수 항목이 검증되었으며 프롬프트가 완성되었습니다!', 'success');
            }
        }
    });

    btnPrev.addEventListener('click', () => {
        if (currentStep > 1) {
            goToStep(currentStep - 1);
        }
    });

    /**
     * Progress indicators
     */
    function updateProgress() {
        const percent = ((currentStep - 1) / (totalSteps - 1)) * 100;
        progressBar.style.width = `${percent}%`;
        currentStepIndicator.textContent = currentStep;
    }

    /**
     * Assemble final raw text prompt (No HTML, substitutes missing options with '없음' or validation errors)
     */
    function assembleFinalPrompt() {
        const config = purposeConfigs[selectedPurpose];
        let result = config.template;
        
        Object.keys(config.fields).forEach(id => {
            const f = config.fields[id];
            const hasVal = formData[id] && formData[id].trim() !== '';
            
            let value;
            if (hasVal) {
                value = formData[id].trim();
            } else if (f.required) {
                value = `[필수입력: ${f.label} 미입력]`;
            } else {
                value = '없음';
            }
            
            result = result.replace(new RegExp(escapeRegExp(f.token), 'g'), value);
        });
        
        finalOutputTextarea.value = result;
    }

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * Render live HTML preview on the right panel
     */
    function updatePreview() {
        const config = purposeConfigs[selectedPurpose];
        let previewHtml = config.template;
        
        // Escape HTML
        previewHtml = previewHtml
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        // Format [Titles]
        previewHtml = previewHtml.replace(/(\[[^\]\n]+\])/g, '<strong style="color:var(--color-secondary); display:block; margin-top:15px; margin-bottom:5px;">$1</strong>');

        // Swap variables with highlights
        Object.keys(config.fields).forEach(id => {
            const f = config.fields[id];
            const cleanTokenName = f.token.replace(/[{}]/g, '');
            const value = formData[id];
            const hasVal = value && value.trim() !== '';
            
            let replacedHtml;
            if (hasVal) {
                const cleanVal = value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                replacedHtml = `<span class="highlight-token" title="${cleanTokenName}">${cleanVal}</span>`;
            } else if (f.required) {
                replacedHtml = `<span class="empty-token" style="color:var(--color-accent); border:1px dashed var(--color-accent); box-shadow: 0 0 5px rgba(239, 68, 68, 0.2);">{${cleanTokenName} (필수)}</span>`;
            } else {
                replacedHtml = `<span class="empty-token" style="opacity: 0.5;">없음</span>`;
            }
            
            previewHtml = previewHtml.replace(new RegExp(escapeRegExp(f.token), 'g'), replacedHtml);
        });

        previewContent.innerHTML = previewHtml;
    }

    /**
     * Auto fill single current step examples
     */
    document.getElementById('btn-load-current-example').addEventListener('click', () => {
        const config = purposeConfigs[selectedPurpose];
        const fields = Object.keys(config.fields).filter(id => config.fields[id].step === currentStep);
        
        if (fields.length === 0) {
            showToast('이 단계에는 채울 예시가 없습니다.', 'info');
            return;
        }

        fields.forEach(id => {
            if (config.examples[id]) {
                const inputEl = document.getElementById(id);
                if (inputEl) {
                    inputEl.value = config.examples[id];
                    formData[id] = config.examples[id];
                    updateStepCompletedState(id);
                }
            }
        });
        updatePreview();
        showToast(`${currentStep}단계의 예시 데이터가 입력되었습니다.`, 'success');
    });

    /**
     * Auto fill all steps examples
     */
    document.getElementById('btn-fill-all').addEventListener('click', () => {
        const config = purposeConfigs[selectedPurpose];
        
        Object.keys(config.fields).forEach(id => {
            if (config.examples[id]) {
                const inputEl = document.getElementById(id);
                if (inputEl) {
                    inputEl.value = config.examples[id];
                    formData[id] = config.examples[id];
                    updateStepCompletedState(id);
                }
            }
        });
        
        updatePreview();
        if (currentStep === totalSteps) {
            assembleFinalPrompt();
        }
        showToast(`'${config.title}' 테마의 전체 예시가 성공적으로 채워졌습니다!`, 'success');
    });

    /**
     * Reset Form values
     */
    document.getElementById('btn-reset').addEventListener('click', () => {
        if (confirm('정말로 모든 입력을 지우고 초기화하시겠습니까?')) {
            const config = purposeConfigs[selectedPurpose];
            Object.keys(config.fields).forEach(id => {
                const inputEl = document.getElementById(id);
                if (inputEl) {
                    inputEl.value = '';
                    formData[id] = '';
                }
                const navItem = document.querySelector(`.nav-item[data-step="${config.fields[id].step}"]`);
                if (navItem) navItem.classList.remove('completed');
            });
            
            updatePreview();
            if (currentStep === totalSteps) {
                assembleFinalPrompt();
            }
            goToStep(1);
            showToast('데이터가 성공적으로 초기화되었습니다.', 'info');
        }
    });

    /**
     * Copy final output to clipboard
     */
    document.getElementById('btn-copy-prompt').addEventListener('click', () => {
        if (!handleValidationAndAlert()) {
            return;
        }
        
        assembleFinalPrompt();
        finalOutputTextarea.select();
        finalOutputTextarea.setSelectionRange(0, 99999);

        navigator.clipboard.writeText(finalOutputTextarea.value)
            .then(() => {
                showToast('최종 조립된 프롬프트가 클립보드에 성공적으로 복사되었습니다!', 'success');
            })
            .catch(err => {
                console.error('Copy failed: ', err);
                showToast('클립보드 복사에 실패했습니다. 텍스트 영역을 수동 복사하세요.', 'error');
            });
    });

    /**
     * Toast System
     */
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast`;
        
        let icon = 'fa-check-circle';
        if (type === 'error') {
            icon = 'fa-exclamation-circle';
            toast.style.borderColor = 'var(--color-accent)';
            toast.style.boxShadow = '0 4px 20px rgba(244, 63, 94, 0.2)';
        } else if (type === 'info') {
            icon = 'fa-info-circle';
            toast.style.borderColor = 'var(--color-secondary)';
            toast.style.boxShadow = '0 4px 20px rgba(6, 182, 212, 0.2)';
        }

        toast.innerHTML = `
            <i class="fa-solid ${icon}"></i>
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        toast.offsetHeight; // force reflow
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 3500);
    }

    /**
     * Theme Toggle System (Dark / Light)
     */
    const btnThemeToggle = document.getElementById('btn-theme-toggle');
    
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (btnThemeToggle) {
            btnThemeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    } else {
        document.body.classList.remove('light-mode');
        if (btnThemeToggle) {
            btnThemeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    }

    if (btnThemeToggle) {
        btnThemeToggle.addEventListener('click', () => {
            const isLightMode = document.body.classList.toggle('light-mode');
            if (isLightMode) {
                localStorage.setItem('theme', 'light');
                btnThemeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
                showToast('라이트 모드로 전환되었습니다.', 'info');
            } else {
                localStorage.setItem('theme', 'dark');
                btnThemeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
                showToast('다크 모드로 전환되었습니다.', 'info');
            }
        });
    }

    // --- First Application Boot ---
    // Pre-initialize empty values
    const initialConfig = purposeConfigs[selectedPurpose];
    Object.keys(initialConfig.fields).forEach(id => {
        formData[id] = '';
    });
    
    renderApp();
    updatePreview();
});
