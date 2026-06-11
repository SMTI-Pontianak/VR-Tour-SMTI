// ================================================================
//  youtube-card  —  Reusable YouTube Video Component for A-Frame
// ================================================================
//
//  HOW TO USE
//  ----------
//  1. Add this script to your <head> (after aframe.min.js):
//        <script src="js/video-component.js"></script>
//
//  2. Paste the snippet below anywhere inside your <a-scene>:
//
//     <!-- ===== YouTube Video Snippet (Copy Me!) ===== -->
//     <a-entity id="youtube-card-UNIQUE_ID"
//         youtube-card="videoId: YOUR_VIDEO_ID; title: Judul Video Disini"
//         position="0 1.5 -5"
//         rotation="0 0 0"
//         scale="1 1 1">
//     </a-entity>
//     <!-- ============================================= -->
//
//  3. Replace YOUR_VIDEO_ID with the 11-character YouTube video ID.
//     e.g.  https://youtu.be/dQw4w9WgXcQ  →  videoId: dQw4w9WgXcQ
//
//  SCHEMA OPTIONS
//  --------------
//  videoId  (string)   YouTube video ID                  (required)
//  title    (string)   Label shown below the card        default: "Video"
//  width    (number)   Width  of the card in A-Frame m   default: 4
//  height   (number)   Height of the card in A-Frame m   default: 2.25
// ================================================================

AFRAME.registerComponent('youtube-card', {
    schema: {
        videoId: { type: 'string',  default: '' },
        title:   { type: 'string',  default: 'Video' },
        width:   { type: 'number',  default: 4 },
        height:  { type: 'number',  default: 2.25 }
    },

    init: function () {
        var data = this.data;
        var el   = this.el;

        if (!data.videoId) {
            console.warn('[youtube-card] No videoId provided — skipping render.');
            return;
        }

        var W   = data.width;
        var H   = data.height;
        var R   = H * 0.17;  // play-button radius proportional to card height
        var thumbnailUrl = 'https://img.youtube.com/vi/' + data.videoId + '/hqdefault.jpg';

        // ── Subtle glow border (behind thumbnail) ─────────────────
        var border = document.createElement('a-plane');
        border.setAttribute('width',    W + 0.1);
        border.setAttribute('height',   H + 0.1);
        border.setAttribute('position', '0 0 -0.005');
        border.setAttribute('material', 'color: #00bcd4; opacity: 0.18; shader: flat');

        // ── Thumbnail ──────────────────────────────────────────────
        var thumb = document.createElement('a-plane');
        thumb.setAttribute('width',    W);
        thumb.setAttribute('height',   H);
        thumb.setAttribute('material', 'src: ' + thumbnailUrl + '; shader: flat');
        thumb.setAttribute('class',    'itemButton');

        // ── Play-button circle (red) ───────────────────────────────
        var playCircle = document.createElement('a-circle');
        playCircle.setAttribute('radius',   R);
        playCircle.setAttribute('position', '0 0 0.04');
        playCircle.setAttribute('material', 'color: #CC0000; shader: flat; opacity: 0.92');
        playCircle.setAttribute('class',    'itemButton');

        // ── Play-button icon (▶) ──────────────────────────────────
        var playIcon = document.createElement('a-text');
        playIcon.setAttribute('value',    '▶');
        playIcon.setAttribute('align',    'center');
        playIcon.setAttribute('color',    '#FFFFFF');
        playIcon.setAttribute('width',    R * 3.8);
        playIcon.setAttribute('position', (R * 0.22) + ' ' + (-R * 0.06) + ' 0.06');

        // ── Dark title bar below ───────────────────────────────────
        var titleBg = document.createElement('a-plane');
        titleBg.setAttribute('width',    W);
        titleBg.setAttribute('height',   0.48);
        titleBg.setAttribute('position', '0 ' + (-(H / 2) - 0.24) + ' 0');
        titleBg.setAttribute('material', 'color: #0a0a0a; opacity: 0.82; shader: flat');

        // ── Title text ─────────────────────────────────────────────
        var titleText = document.createElement('a-text');
        titleText.setAttribute('value',    data.title);
        titleText.setAttribute('align',    'center');
        titleText.setAttribute('color',    '#ffffff');
        titleText.setAttribute('width',    W * 1.5);
        titleText.setAttribute('position', '0 ' + (-(H / 2) - 0.24) + ' 0.01');
        titleText.setAttribute('font',     'kelsonsans');

        // ── Assemble ───────────────────────────────────────────────
        el.appendChild(border);
        el.appendChild(thumb);
        el.appendChild(playCircle);
        el.appendChild(playIcon);
        el.appendChild(titleBg);
        el.appendChild(titleText);

        // ── Hover effects ──────────────────────────────────────────
        thumb.addEventListener('mouseenter', function () {
            playCircle.setAttribute('material', 'color: #FF0000; shader: flat; opacity: 1');
            playCircle.setAttribute('scale', '1.15 1.15 1.15');
            border.setAttribute('material', 'color: #00e5ff; opacity: 0.35; shader: flat');
        });
        thumb.addEventListener('mouseleave', function () {
            playCircle.setAttribute('material', 'color: #CC0000; shader: flat; opacity: 0.92');
            playCircle.setAttribute('scale', '1 1 1');
            border.setAttribute('material', 'color: #00bcd4; opacity: 0.18; shader: flat');
        });

        // ── Click handlers ─────────────────────────────────────────
        var vid = data.videoId;
        var ttl = data.title;
        thumb.addEventListener('click', function () { showYoutubeModal(vid, ttl); });
        playCircle.addEventListener('click', function () { showYoutubeModal(vid, ttl); });
    }
});

// ================================================================
//  YouTube Modal  —  created once, reused for all cards on page
// ================================================================

function showYoutubeModal(videoId, title) {
    _ensureYoutubeModal();

    document.getElementById('yt-modal-title').textContent = title || 'Video';
    document.getElementById('yt-iframe').src =
        'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0&modestbranding=1';

    var modal = document.getElementById('yt-modal');
    modal.style.display = 'flex';
    // Small delay so display:flex applies before the fade-in class
    requestAnimationFrame(function () {
        modal.classList.add('yt-modal-visible');
    });

    // Release pointer lock so the user can interact with the overlay
    if (document.pointerLockElement) {
        document.exitPointerLock();
    }
}

function closeYoutubeModal() {
    var modal = document.getElementById('yt-modal');
    if (!modal) return;
    modal.classList.remove('yt-modal-visible');
    // Stop video immediately so audio cuts out
    document.getElementById('yt-iframe').src = '';
    setTimeout(function () {
        modal.style.display = 'none';
    }, 300); // match CSS transition duration
}

function _ensureYoutubeModal() {
    if (document.getElementById('yt-modal')) return;

    var modal = document.createElement('div');
    modal.id = 'yt-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML =
        '<div id="yt-modal-inner">' +
            '<div id="yt-modal-header">' +
                '<div id="yt-modal-logo">▶ YouTube</div>' +
                '<div id="yt-modal-title"></div>' +
                '<button id="yt-modal-close" onclick="closeYoutubeModal()" aria-label="Tutup video">✕</button>' +
            '</div>' +
            '<div id="yt-iframe-wrapper">' +
                '<iframe id="yt-iframe" frameborder="0"' +
                ' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"' +
                ' allowfullscreen></iframe>' +
            '</div>' +
        '</div>';

    // Close on backdrop click
    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeYoutubeModal();
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeYoutubeModal();
    });

    document.body.appendChild(modal);
}
