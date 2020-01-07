function importAll (r) { r.keys().forEach(r); }

importAll(require.context('./', true, /\.(js|scss|png|jpe?g|gif|svg)$/));

// importAll(require.context('./', true, /\.(js|scss)$/));
