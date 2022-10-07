# YUTI


## 💎 서비스 소개

- 12개의 설문조사를 통해 사용자의 MBTI를 유추해서 좋아할만한 유튜버를 추천해주는 서비스입니다.
- 서비스 목표: 서비스를 이용하면서 사용자들이 남기는 로그를 분석하여 개선된 서비스를 제공하고자 합니다.
    - 페이지별로 이탈률, 문항별 소요 시간, SNS별 공유하기 클릭 빈도, 카카오톡 유입 경로, MBTI 선호도를 분석 및 시각화했습니다.
    - 메인 색깔을 두가지로 나누어 A/B 테스트를 진행하였습니다.



## 📅 프로젝트 진행 기간

2022.08.22~2022.10.07



## 💻팀원 소개

- 박민석: 팀장, FE
- 이창엽: FE
- 한지운: FE
- 노수빈: BE
- 신치용: BE, DevOps
- 장세진: BE



## 🔎 주요 기능

### MBTI 설문조사

> 12개의 설문문항으로 사용자의 MBTI와 해당 MBTI가 가장 즐겨보는 3명의 유튜버 추천
> 
- 메인 페이지

![Untitled](README.assets/Untitled.png)

- 설문 페이지

![Untitled](README.assets/Untitled%201.png)

- 유튜버 검색 페이지

![Untitled](README.assets/Untitled%202.png)

- 결과 페이지

![Untitled](README.assets/Untitled%203.png)

### 관리자 페이지

- 서비스 여정도, 카카오톡 유입 경로, MBTI 선호도 등을 그래프로 나타내 향후 서비스 개선 지표로 사용

### 서비스 여정도

![Untitled](README.assets/Untitled%204.png)

### 공유하기 클릭 빈도

![Untitled](README.assets/Untitled%205.png)

### 문항별 소요 시간

![Untitled](README.assets/Untitled%206.png)

### 카카오톡 유입 경로

![Untitled](README.assets/Untitled%207.png)

### MBTI 선호도

![Untitled](README.assets/Untitled%208.png)



## 🛠 기술 스택

| Frontend                                                     | Backend                                                      | DevOps                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/> <img src="https://img.shields.io/badge/Chart.js-FF6384?style=flat-square&logo=Chart.js&logoColor=white"/> <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white"/> | <img src="https://img.shields.io/badge/Java-6DB33F?style=flat-square&logo=Java&logoColor=black"/> <img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=flat-square&logo=SpringBoot&logoColor=white"/> <img src="https://img.shields.io/badge/SpringSecurity-6DB33F?style=flat-square&logo=SpringSecurity&logoColor=white"/> <img src="https://img.shields.io/badge/Gradle-02303A?style=flat-square&logo=Gradle&logoColor=white"/> <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/> <img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=flat-square&logo=Amazon RDS&logoColor=white"/> <img src="https://img.shields.io/badge/Apache Kafka-231F20?style=flat-square&logo=Apache Kafka&logoColor=white"/> <img src="https://img.shields.io/badge/Elasticsearch-005571?style=flat-square&logo=Elasticsearch&logoColor=white"/> | <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=flat-square&logo=Amazon EC2&logoColor=white"/> <img src="https://img.shields.io/badge/Ubuntu-E95420?style=flat-square&logo=Ubuntu&logoColor=white"/> <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white"/> <img src="https://img.shields.io/badge/NGINX-009639?style=flat-square&logo=NGINX&logoColor=white"/> |



## 🤝 협업 관리 Tools

| 협업 관리 Tools                                              |
| ------------------------------------------------------------ |
| <img src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=Notion&logoColor=white"/> <img src="https://img.shields.io/badge/GitLab-FC6D26?style=flat-square&logo=GitLab&logoColor=white"/> <img src="https://img.shields.io/badge/Jira-0052CC?style=flat-square&logo=Jira&logoColor=white"/> <img src="https://img.shields.io/badge/Discord-5865F2?style=flat-square&logo=Discord&logoColor=white"/> |



## 📐 시스템 아키텍처

![Untitled 10](README.assets/Untitled%2010.png)



## ✏️ 협업 관리

### Gitlab

> git-flow 사용
> 

**브랜치 양식**

1. 메인 브랜치
    1. `master`: 배포 가능한 브랜치 (안정적이어야 함)
    2. `dev`: 다음 출시 버전을 개발하는 브랜치
2. 보조 브랜치
    1. `feature`: 새로운 기능 개발 및 버그 수정
        1. `feature-front/[featurename]`
        2. `feature-back/[featurename]`
    2. `hotfix` : master 브랜치로 배포를 했는데 버그가 생겼을 때 긴급 수정하는 브랜치

**커밋 양식**

- 태그 타입
    - `feat` : 새로운 기능 추가
    - `fix` : 버그 수정
    - `docs` : 문서 수정 및 추가
    - `design` : CSS 등 사용자 UI 디자인 변경
    - `style` : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
    - `refactor` : 코드 리팩토링
    - `test` : 테스트 코드, 리팩토링 테스트 코드 추가
    - `chore` : 빌드 업무 수정, 패키지 매니저 수정(.gitignore 수정 같은 경우)
- ex) `feat: 회원 가입 기능 구현`

**Pull Request 규칙**

- [FEATURE] `신규 기능 추가`
- [DOCS] `문서 수정`
- [FIX] `버그 수정`
- [DESIGN] `디자인 수정`
- [STYLE] `코드 포매팅, 세미콜론 누락 등 수정`
- [REFACTOR] `코드 리팩토링 (동작에 변경 없을 때)`
- [TEST] `테스트 코드`
- [CHORE] `빌드 업무 수정, 패키지 매니저 수정 등 기타 잡일`
- [VERSION] v1.0
- ex) `[FEATURE] 회원가입 기능 #이슈번호 #지라번호`

### Jira 컨벤션

**Epic**

- [Meeting] 회의
- [Planning] 기획
- [Design] 설계
- [Study] 학습
- [Ucc] 동영상 작업
- [Docs] 문서 작업
- [Dev] 설문 페이지
- [Dev] 설문결과 페이지
- [Dev] 통계 페이지

**Story 규칙**

- [BE]
- [FE]
- [공통]



## ✈️ 포팅 매뉴얼

[포팅매뉴얼](exec/%ED%8F%AC%ED%8C%85%20%EB%A9%94%EB%89%B4%EC%96%BC.md)
