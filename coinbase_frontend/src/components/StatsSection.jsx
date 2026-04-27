const StatsSection = () => {
    const stats = [
        { label: 'Quarterly volume traded', value: '$145B' },
        { label: 'Countries supported', value: '100+' },
        { label: 'Verified users', value: '100M+' },
    ];

    return (
        <section className="bg-[#0052FF] text-white px-6 py-16 md:px-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                {stats.map((stat) => (
                    <div key={stat.label}>
                        <div className="text-5xl md:text-6xl font-bold mb-4">{stat.value}</div>
                        <div className="text-blue-100 text-sm md:text-base uppercase tracking-widest font-semibold">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StatsSection;
