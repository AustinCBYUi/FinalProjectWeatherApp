(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();function i(o,t=document){return t.querySelector(o)}function s(o,t){t.insertAdjacentHTML("afterbegin",o)}async function l(o){return await(await fetch(o)).text()}async function d(){const t=new Date().getFullYear(),n=document.querySelector("#dynamic-footer");n.querySelector(".year").textContent=t}async function u(){const o=await l("/partials/header.html"),t=await l("/partials/footer.html"),n=i("#dynamic-header"),c=i("#dynamic-footer");s(o,n),s(t,c),d()}u();
