const clearUrlParams = () => {
  const currURL = window.location.href;
  const url = currURL.split(window.location.host)[1].split("?")[0];
  window.history.pushState({}, document.title, url);
};

module.exports = clearUrlParams;
