.map(x => {
    const ytReg = /youtu(?:.*\/v\/|.*v\=|\.be\/)([A-Za-z0-9_\-]{11})/;
    const match = x.match(ytReg);
    const start = x.match(/t=(\d+)/) ? . [1];
    return match ? {
        start: start || 100,
        end: start ? Number(start) + 10 : 110,
        id: match[1]
    } : undefined
    }).filter(x => x))