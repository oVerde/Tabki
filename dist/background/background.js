"use strict";(()=>{browser.runtime.onInstalled.addListener(e=>{e.reason==="install"&&browser.tabs.create({url:"welcome/welcome.html"})});})();
