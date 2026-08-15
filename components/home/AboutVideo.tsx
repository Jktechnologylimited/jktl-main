// Static placeholder -- no live API call. Once the backend/content layer is
// reconnected, swap this for the useWatchVideos("about", FALLBACK) hook so a
// real video set in Command Center -> Videos (page key "about") plays here.
export default function AboutVideo() {
  return (
    <div className="rounded overflow-hidden border border-cream-300" style={{ position: "relative", aspectRatio: "4/3", background: "#0B1640" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #C9A84C18 0%, #080F25 100%)" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "2px solid #C9A84C60", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3" /></svg>
          </div>
          <p style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "rgba(226,232,240,0.35)", letterSpacing: "0.1em" }}>VIDEO COMING SOON</p>
        </div>
      </div>
    </div>
  );
}
