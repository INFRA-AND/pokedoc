// 카드 데이터 배열
const CARDS_DATA = [
    {
        href: "main/2022_halloween.html",
        class: "card-halloween",
        type: "seal",
        storage: "collected_halloween_2022",
        total: 27,
        image: "image/main_image/2022_Halloween_main.png",
        title: "🎃 [띠부씰] 2022 할로윈",
        description: "27종의 특별한 할로윈 스티커"
    },
    {
        href: "main/2022_winter.html",
        class: "card-winter",
        type: "seal",
        storage: "collected_winter_2022",
        total: 30,
        image: "image/main_image/2022_winter_main.png",
        title: "❄️ [띠부씰] 2022 윈터",
        description: "30종의 특별한 겨울 스티커"
    },
    {
        href: "main/2023_lovely.html",
        class: "card-lovely",
        type: "seal",
        storage: "collected_lovely_2023",
        total: 30,
        image: "image/main_image/2023_lovely_main.png",
        title: "💕 [띠부씰] 2023 러블리",
        description: "30종의 특별한 러블리 스티커"
    },
    {
        href: "main/30y_art.html",
        class: "card-art30y",
        type: "seal",
        storage: "collected_art_30y",
        total: 100,
        image: "image/main_image/30y_art_main.png",
        title: "✨ [띠부씰] 30주년 아트웍",
        description: "100종의 아트웍 스페셜 스티커"
    },
    {
        href: "main/2023_new.html",
        class: "card-new2023",
        type: "seal",
        storage: "collected_new_2023",
        total: 55,
        image: "image/main_image/2023_new_main.png",
        title: "⚡ [띠부씰] 2023 NEW",
        description: "55종의 NEW 시즌 스티커"
    },
    {
        href: "main/2022_1season.html",
        class: "card-season1",
        type: "seal",
        storage: "collected_1season_2022",
        total: 159,
        image: "image/main_image/2022_1season_main.png",
        title: "🌿 [띠부씰] 2022 1세대",
        description: "159종의 오리지널 1세대 스티커"
    },
    {
        href: "main/2022_2season.html",
        class: "card-season2",
        type: "seal",
        storage: "collected_2season_2022",
        total: 116,
        image: "image/main_image/2022_season2_main.png",
        title: "🍯 [띠부씰] 2022 2세대",
        description: "116종의 화려한 2세대 스티커"
    },
    {
        href: "main/2024_Mega_evolution.html",
        class: "card-mega",
        type: "seal",
        storage: "collected_mega_evolution_2024",
        total: 53,
        image: "image/main_image/2024_mega_main.png",
        title: "🔮 [띠부씰] 2024 메가진화",
        description: "53종의 한정판 BIG 사이즈 띠부씰"
    },
    {
        href: "main/2023_new_1season.html",
        class: "card-new-s1",
        type: "seal",
        storage: "collected_new_1season_2023",
        total: 139,
        image: "image/main_image/2023_new_season1_main.png",
        title: "🍇 [띠부씰] 2023 NEW 시즌1",
        description: "139종으로 대폭 개편된 뉴 스티커"
    },
    {
        href: "main/2024_ID_picture.html",
        class: "card-id2024",
        type: "sticker",
        storage: "collected_id_picture_2024_1st",
        total: 100,
        image: "image/main_image/2024_ID_picture_main.png",
        title: "📷 [스티커] 2024 증명사진 1탄",
        description: "100종의 포켓몬 증명사진 스티커"
    },
    {
        href: "main/2025_ID_picture.html",
        class: "card-id2025",
        type: "sticker",
        storage: "collected_id_picture_2025_2nd",
        total: 100,
        image: "image/main_image/2025_ID_picture_main.jpg",
        title: "📷 [스티커] 2025 증명사진 2탄",
        description: "100종의 포켓몬 증명사진 스티커"
    },
    {
        href: "main/2024_new_season2.html",
        class: "card-season2-2024",
        type: "seal",
        storage: "collected_new_season2_2024",
        total: 163,
        image: "image/main_image/2024_new_season2_main.png",
        title: "🌊 [띠부씰] 2024 NEW 시즌2",
        description: "163종 (꼬부기 소방대 포함) 시즌2 스티커"
    },
    {
        href: "main/2024_new_season3.html",
        class: "card-season3-2024",
        type: "seal",
        storage: "collected_new_season3_2024",  // ✅ 수정: collected_season3_2024 → collected_new_season3_2024
        total: 154,
        image: "image/main_image/2024_new_season3_main.png",
        title: "🍁 [띠부씰] 2024 NEW 시즌3",
        description: "154종의 풍성한 뉴 시즌3 스티커"
    },
    {
        href: "main/2025_new_season4.html",
        class: "card-season4-2025",
        type: "seal",
        storage: "collected_new_season4_2025",
        total: 168,
        image: "image/main_image/2025_new_season4_main.png",
        title: "❄️ [띠부씰] 2025 NEW 시즌4",
        description: "168종의 특별한 NEW 시즌4 스티커"
    },
    {
        href: "main/2026_new_season5.html",
        class: "card-season5-2026",
        type: "seal",
        storage: "collected_new_season5_2026",
        total: 150,
        image: "image/main_image/2026_new_season5_main.png",
        title: "🌸 [띠부씰] 2026 NEW 시즌5",
        description: "150종의 기념비적인 30주년 스티커"
    },
    {
        href: "main/baskin_30y.html",
        class: "card-baskin-30y",
        type: "sticker",
        storage: "collected_baskin_30y_2026",
        total: 27,
        image: "image/main_image/baskin_30y_main.jpg",
        title: "🍦 [스티커] 배스킨라빈스 30주년",
        description: "27종의 특별한 포켓몬 3D 스틱바 스티커"
    },
    {
        href: "main/2024_pixel_art.html",
        class: "card-pixel2024",
        type: "seal",
        storage: "collected_pixel_art_2024",
        total: 151,
        image: "image/main_image/2024_pixel_art_main.png",
        title: "👾 [띠부씰] 2024 픽셀아트",
        description: "151종의 한정판 픽셀아트 띠부씰 시리즈"
    },
    {
        href: "main/2024_removable.html",
        class: "card-removable2024",
        type: "sticker",
        storage: "collected_removable_2024",
        total: 40,
        image: "image/main_image/2024_2024_removable_main.jpg",
        title: "✨ [스티커] 2024 리무버블",
        description: "40종의 담터 애사비 젤리 리무버블 시리즈"
    },
    {
        href: "main/2025_pocketpis.html",
        class: "card-pocketpis",
        type: "seal",
        storage: "collected_pocketpis_2025",
        total: 114,
        image: "image/main_image/2025_pocketpis_main.png",
        title: "📷 [띠부씰] 포켓피스 도감",
        description: "2025년형 포켓피스 114종 수집 현황"
    }
];
