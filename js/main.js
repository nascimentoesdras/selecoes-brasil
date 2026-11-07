import { CONFIG } from "../config.js?v=20261106";

const $ = selector => document.querySelector(selector);
const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
const storageKey = "eleicoes-brasil-favorites";
let state = { jobs: [...CONFIG.jobs], category: "", sort: "recent", visible: 6, favorites: loadFavorites() };

function loadFavorites() {
    try { return JSON.parse(localStorage.getItem(storageKey) || '{"jobs":[],"companies":[]}'); }
    catch (error) { console.warn("Não foi possível carregar favoritos.", error); return { jobs: [], companies: [] }; }
}
function saveFavorites() { localStorage.setItem(storageKey, JSON.stringify(state.favorites)); }
function logo(initials, color) { return `<span class="company-logo" style="background:${escapeHtml(color)}">${escapeHtml(initials)}</span>`; }
function jobCard(job) {
    const favorite = state.favorites.jobs.includes(job.id);
    return `<article class="job-card" data-job-id="${job.id}" tabindex="0" role="button" aria-label="Ver detalhes de ${escapeHtml(job.title)}">${logo(job.initials, job.color)}<div class="job-main"><div class="job-company">${escapeHtml(job.company)} · ${escapeHtml(job.posted)}</div><h3 class="job-title">${escapeHtml(job.title)}</h3><div class="job-meta"><span><i class="bi bi-briefcase"></i>${escapeHtml(job.contract)}</span><span><i class="bi bi-geo-alt"></i>${escapeHtml(job.location)}</span><span><i class="bi bi-house"></i>${escapeHtml(job.mode)}</span></div><div class="tags">${job.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div></div><div class="job-side"><button class="favorite ${favorite ? "active" : ""}" data-favorite-job="${job.id}" aria-label="${favorite ? "Remover dos favoritos" : "Favoritar vaga"}"><i class="bi bi-heart"></i></button><span class="salary">${escapeHtml(job.salary)}</span></div></article>`;
}
function featuredCard(job) {
    return `<article class="featured-card" data-job-id="${job.id}" tabindex="0" role="button">${logo(job.initials, job.color)} <span class="featured-label">Em destaque</span><h3 class="job-title">${escapeHtml(job.title)}</h3><div class="job-company">${escapeHtml(job.company)} · ${escapeHtml(job.mode)}</div><span class="salary">${escapeHtml(job.salary)}</span></article>`;
}
function renderCategories() {
    $("#categories").innerHTML = CONFIG.categories.map(category => `<button class="category-item ${state.category === category.name ? "active" : ""}" data-category="${escapeHtml(category.name)}"><span><i class="bi ${category.icon}"></i>${escapeHtml(category.name)}</span><b>${category.count}</b></button>`).join("");
}
function getFilteredJobs() {
    const keyword = $("#keyword").value.trim().toLowerCase(), location = $("#location").value.trim().toLowerCase(), mode = $("#mode-filter").value, contract = $("#contract-filter").value;
    return CONFIG.jobs.filter(job => (!keyword || [job.title, job.company, job.category, ...job.tags].join(" ").toLowerCase().includes(keyword)) && (!location || job.location.toLowerCase().includes(location) || job.mode.toLowerCase().includes(location)) && (!state.category || job.category === state.category) && (!mode || job.mode === mode) && (!contract || job.contract === contract)).sort((a, b) => state.sort === "featured" ? Number(b.featured) - Number(a.featured) : a.postedDays - b.postedDays);
}
function renderJobs() {
    const jobs = getFilteredJobs(), visible = jobs.slice(0, state.visible);
    $("#jobs-list").innerHTML = visible.length ? visible.map(jobCard).join("") : `<div class="empty-state"><p>Nenhuma vaga encontrada com esses filtros.</p></div>`;
    $("#result-count").textContent = `${jobs.length} ${jobs.length === 1 ? "vaga encontrada" : "vagas encontradas"}`;
    $("#load-more").hidden = visible.length >= jobs.length || jobs.length === 0;
}
function renderCompanies() {
    $("#companies").innerHTML = CONFIG.companies.map(company => {
        const favorite = state.favorites.companies.includes(company.name);
        return `<article class="company-card"><button class="favorite ${favorite ? "active" : ""}" data-favorite-company="${escapeHtml(company.name)}" aria-label="Favoritar ${escapeHtml(company.name)}"><i class="bi bi-heart"></i></button><div class="company-card-head">${logo(company.initials, company.color)}<div><h3>${escapeHtml(company.name)}</h3><small>${escapeHtml(company.category)}</small></div></div><p>${escapeHtml(company.description)}</p><div class="company-info"><span><i class="bi bi-geo-alt"></i> ${escapeHtml(company.location)}</span><b>${company.jobs} vagas</b></div></article>`;
    }).join("");
}
function openJob(jobId) {
    const job = CONFIG.jobs.find(item => item.id === Number(jobId)); if (!job) return;
    $("#modal-content").innerHTML = `${logo(job.initials, job.color)}<h2 id="modal-title">${escapeHtml(job.title)}</h2><p class="modal-company">${escapeHtml(job.company)} · ${escapeHtml(job.location)} · ${escapeHtml(job.mode)}</p><div class="tags">${job.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div><h3>Sobre a vaga</h3><p>${escapeHtml(job.description)}</p><h3>Responsabilidades</h3><ul>${job.responsibilities.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul><h3>Requisitos</h3><ul>${job.requirements.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul><h3>Benefícios</h3><ul>${job.benefits.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul><button class="btn btn-primary modal-apply" data-apply="${job.id}">Candidatar-se <i class="bi bi-arrow-up-right"></i></button>`;
    $("#modal").hidden = false; document.body.style.overflow = "hidden";
}
function closeModal() { $("#modal").hidden = true; document.body.style.overflow = ""; }
function toast(message) { const element = $("#toast"); element.textContent = message; element.classList.add("show"); setTimeout(() => element.classList.remove("show"), 2600); }
function toggleFavorite(type, value) {
    const list = state.favorites[type], index = list.indexOf(value); index >= 0 ? list.splice(index, 1) : list.push(value); saveFavorites(); renderJobs(); renderCompanies(); toast(index >= 0 ? "Removido dos favoritos." : "Salvo nos favoritos.");
}
function setupEvents() {
    $("#search-form").addEventListener("submit", event => { event.preventDefault(); state.visible = 6; renderJobs(); $("#vagas").scrollIntoView({ behavior: "smooth" }); });
    ["#keyword", "#location", "#mode-filter", "#contract-filter"].forEach(selector => $(selector).addEventListener("input", () => { state.visible = 6; renderJobs(); }));
    document.addEventListener("click", event => {
        const category = event.target.closest("[data-category]"); if (category) { state.category = state.category === category.dataset.category ? "" : category.dataset.category; renderCategories(); renderJobs(); }
        const search = event.target.closest("[data-search]"); if (search) { $("#keyword").value = search.dataset.search; state.visible = 6; renderJobs(); }
        const favoriteJob = event.target.closest("[data-favorite-job]"); if (favoriteJob) { event.stopPropagation(); toggleFavorite("jobs", Number(favoriteJob.dataset.favoriteJob)); }
        const favoriteCompany = event.target.closest("[data-favorite-company]"); if (favoriteCompany) { event.stopPropagation(); toggleFavorite("companies", favoriteCompany.dataset.favoriteCompany); }
        const card = event.target.closest("[data-job-id]"); if (card && !event.target.closest("button")) openJob(card.dataset.jobId);
        const apply = event.target.closest("[data-apply]"); if (apply) { closeModal(); toast("Candidatura iniciada! O cadastro estará disponível em breve."); }
    });
    $("#load-more").addEventListener("click", () => { state.visible += 3; renderJobs(); });
    document.querySelectorAll("[data-sort]").forEach(button => button.addEventListener("click", () => { document.querySelectorAll("[data-sort]").forEach(item => item.classList.remove("active")); button.classList.add("active"); state.sort = button.dataset.sort; renderJobs(); }));
    $("#modal-close").addEventListener("click", closeModal); $("#modal").addEventListener("click", event => { if (event.target === $("#modal")) closeModal(); });
    $("#menu-toggle").addEventListener("click", () => { const nav = $("#mobile-nav"); nav.classList.toggle("open"); $("#menu-toggle").setAttribute("aria-expanded", nav.classList.contains("open")); });
}
function init() {
    document.title = CONFIG.seo.title; document.documentElement.style.setProperty("--primary", CONFIG.theme.primary); document.documentElement.style.setProperty("--primary-dark", CONFIG.theme.primaryDark);
    $("#desktop-nav").innerHTML = CONFIG.navigation.map(item => `<a href="${item.href}">${escapeHtml(item.label)}</a>`).join(""); $("#mobile-nav").innerHTML = CONFIG.navigation.map(item => `<a href="${item.href}">${escapeHtml(item.label)}</a>`).join("");
    renderCategories(); renderJobs(); renderCompanies(); $("#featured-jobs").innerHTML = CONFIG.jobs.filter(job => job.featured).map(featuredCard).join(""); setupEvents();
}
init();
