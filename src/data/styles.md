```tsx
<main className="min-h-screen bg-neutral-950">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-950 pt-24 pb-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="container relative mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              {/* Left Column - Main Message */}
              <div className="space-y-8">
                {/* Logo */}
                <div className="inline-block">
                  <img 
                    src="https://cdn.sanahuja.dev/sanahujadev/Logo/jpeg/Logo-1280w.jpeg" 
                    alt="SanahujaDev Logo"
                    className="h-24 md:h-32 w-auto"
                  />
                </div>

                {/* Headline */}
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
                    <span className="text-primary-500">El Socio Digital</span>
                    <br />
                    <span className="text-neutral-50">que SÍ te Acompaña</span>
                    <br />
                    <span className="text-neutral-100">en Tenerife.</span>
                  </h1>
                  
                  <p className="text-lg md:text-xl text-neutral-300 leading-relaxed text-pretty max-w-2xl">
                    Para la pyme 'frustrada' y el autónomo 'aislado'. Creo tu web profesional (WPO 99), ultra-rápida, y me quedo a tu lado para que consigas tus metas. Porque <strong className="text-primary-400">tu éxito es mi éxito</strong>.
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/es/servicios/diseno-web-tenerife"
                    className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-primary-900/50 hover:shadow-xl hover:shadow-primary-900/60 hover:scale-105"
                  >
                    Ver el Gancho (Diseño Web -90%)
                  </Link>
                  <Link 
                    href="/es/sobre-mi"
                    className="inline-flex items-center justify-center px-8 py-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-semibold rounded-lg transition-all duration-200 border border-neutral-700"
                  >
                    Mi Promesa (Sobre Mí)
                  </Link>
                </div>
              </div>

              {/* Right Column - Visual Trust Card */}
              <div className="relative">
                {/* Main Trust Card */}
                <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl p-8 shadow-2xl">
                  <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-500/10 border border-secondary-500/30 rounded-full">
                      <svg className="w-5 h-5 text-secondary-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-semibold text-secondary-300">Confianza Técnica</span>
                    </div>

                    <h3 className="text-2xl font-bold text-neutral-50">Resultados, no palabras.</h3>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      <div className="bg-neutral-950 border border-accent-500/30 rounded-xl p-4">
                        <div className="text-4xl font-bold text-accent-400 mb-1">99</div>
                        <div className="text-xs text-neutral-400 leading-tight">Puntuación WPO</div>
                      </div>
                      <div className="bg-neutral-950 border border-primary-500/30 rounded-xl p-4">
                        <div className="text-4xl font-bold text-primary-400 mb-1">90%</div>
                        <div className="text-xs text-neutral-400 leading-tight">Descuento Inicial</div>
                      </div>
                      <div className="bg-neutral-950 border border-secondary-500/30 rounded-xl p-4">
                        <div className="text-4xl font-bold text-secondary-400 mb-1">12</div>
                        <div className="text-xs text-neutral-400 leading-tight">Meses de Soporte</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full backdrop-blur-sm shadow-xl">
                  <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-sm font-semibold text-primary-300">Tu Socio Digital</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problema Section */}
        <section className="py-16 bg-neutral-950">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-12">
              {/* Section Header */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full">
                  <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="text-sm font-semibold text-primary-300">El Problema Real</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-50 text-balance">
                  ¿Harto de la 'Web Abandonada'?
                </h2>
                <p className="text-lg text-neutral-300 max-w-3xl mx-auto text-pretty">
                  Seguro que te suena: desarrolladores que desaparecen, webs lentas (WPO 40-50) que no traen clientes, y tú, solo en medio de la 'selva digital'. Mi marca se construyó para ser la respuesta a ese problema.
                </p>
              </div>

              {/* Comparison Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Vendedor Card */}
                <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border-2 border-red-500/20 rounded-xl p-8 space-y-6">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full">
                      <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs font-semibold text-red-300">Evita esto</span>
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-100">Un Vendedor</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Te entrega un producto",
                      "Cobra y desaparece",
                      "Enfoque en la 'entrega'",
                      "WPO Lento (40-50)"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-neutral-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Socio Card */}
                <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border-2 border-accent-500/40 rounded-xl p-8 space-y-6 relative overflow-hidden">
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-accent-500/5 to-transparent"></div>
                  
                  <div className="relative space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-500/10 border border-accent-500/30 rounded-full">
                      <svg className="w-4 h-4 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs font-semibold text-accent-300">Elige esto</span>
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-50">Tu Socio Digital</h3>
                  </div>
                  <ul className="space-y-3 relative">
                    {[
                      "Te da un servicio continuo",
                      "Se queda 12 meses a tu lado",
                      "Enfoque en 'tus objetivos'",
                      "WPO Rápido (99)"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-accent-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-neutral-100 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hub Section */}
        <section className="py-16 bg-neutral-950">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-12">
              {/* Section Header */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-500/10 border border-secondary-500/30 rounded-full">
                  <svg className="w-5 h-5 text-secondary-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                    <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                    <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                  </svg>
                  <span className="text-sm font-semibold text-secondary-300">Pensamiento Piramidal</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-50 text-balance">
                  Un Hub de Soluciones para Ti
                </h2>
                <p className="text-lg text-neutral-300 max-w-3xl mx-auto text-pretty">
                  Mi estrategia es clara. Te atraigo con un 'Gancho' irresistible, te muestro el 'Valor' de mis packs, y lo respaldo todo con 'Confianza' y 'Autoridad'.
                </p>
              </div>

              {/* Feature Cards Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Card 1: Gancho */}
                <Link href="/es/servicios/diseno-web-tenerife" className="group">
                  <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 border-2 border-primary-500/20 hover:border-primary-500/50 rounded-xl p-6 space-y-4 transition-all duration-300 hover:scale-105 h-full">
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-500/10 border border-primary-500/30 rounded-full">
                        <svg className="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                        </svg>
                        <span className="text-xs font-semibold text-primary-300">El Gancho</span>
                      </div>
                      <h3 className="text-xl font-bold text-neutral-50 group-hover:text-primary-400 transition-colors">
                        Diseño Web (-90% Dto)
                      </h3>
                    </div>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      Tu web profesional ultra-rápida (WPO 99). El 'gancho' para empezar a trabajar juntos con un 90% de descuento.
                    </p>
                    <div className="flex items-center gap-2 text-primary-400 text-sm font-semibold">
                      Ver servicio
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>

                {/* Card 2: Valor */}
                <Link href="/es/packs/" className="group">
                  <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 border-2 border-accent-500/20 hover:border-accent-500/50 rounded-xl p-6 space-y-4 transition-all duration-300 hover:scale-105 h-full">
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-500/10 border border-accent-500/30 rounded-full">
                        <svg className="w-4 h-4 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <span className="text-xs font-semibold text-accent-300">El Valor</span>
                      </div>
                      <h3 className="text-xl font-bold text-neutral-50 group-hover:text-accent-400 transition-colors">
                        Packs Estratégicos
                      </h3>
                    </div>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      Soluciones todo-en-uno (Mantenimiento, SEO, Contenido) con un ahorro claro. El 'upsell' inteligente.
                    </p>
                    <div className="flex items-center gap-2 text-accent-400 text-sm font-semibold">
                      Ver packs
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>

                {/* Card 3: Confianza */}
                <Link href="/es/sobre-mi" className="group">
                  <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 border-2 border-secondary-500/20 hover:border-secondary-500/50 rounded-xl p-6 space-y-4 transition-all duration-300 hover:scale-105 h-full">
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-500/10 border border-secondary-500/30 rounded-full">
                        <svg className="w-4 h-4 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-xs font-semibold text-secondary-300">La Confianza</span>
                      </div>
                      <h3 className="text-xl font-bold text-neutral-50 group-hover:text-secondary-400 transition-colors">
                        Sobre Mí (Mi Promesa)
                      </h3>
                    </div>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      No soy una agencia fantasma. Soy José Sanahuja. Mira mis 108 certificaciones y mi promesa como tu 'Socio Digital'.
                    </p>
                    <div className="flex items-center gap-2 text-secondary-400 text-sm font-semibold">
                      Conocer más
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>

                {/* Card 4: Autoridad */}
                <Link href="/es/blog" className="group">
                  <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 border-2 border-neutral-700 hover:border-neutral-600 rounded-xl p-6 space-y-4 transition-all duration-300 hover:scale-105 h-full">
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-700/50 border border-neutral-600 rounded-full">
                        <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-xs font-semibold text-neutral-300">La Autoridad</span>
                      </div>
                      <h3 className="text-xl font-bold text-neutral-50 group-hover:text-neutral-300 transition-colors">
                        El Blog (WIP)
                      </h3>
                    </div>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      Mi 'Plan de Autoridad' a largo plazo. Artículos de SEO Programático, WPO y estrategia local.
                    </p>
                    <div className="flex items-center gap-2 text-neutral-400 text-sm font-semibold">
                      Próximamente
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 bg-neutral-950">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-12">
              {/* Section Header */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500/10 border border-accent-500/30 rounded-full">
                  <svg className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold text-accent-300">Prueba Social Real (E-A-T)</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-50 text-balance">
                  Confianza Ganada, No Regalada
                </h2>
                <p className="text-lg text-neutral-300 max-w-3xl mx-auto text-pretty">
                  Mi reputación se basa en resultados. Con más de 108 certificaciones y una puntuación perfecta en plataformas globales, mi compromiso es real.
                </p>
              </div>

              {/* Proof Card */}
              <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border-2 border-accent-500/30 rounded-2xl p-8 md:p-12 space-y-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-accent-300 uppercase tracking-wider">Plataforma Global</div>
                    <div className="text-3xl font-bold text-neutral-50">Fiverr</div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-accent-400">5.0</div>
                      <div className="flex gap-1 justify-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <div className="h-12 w-px bg-neutral-700"></div>
                    <div className="text-center">
                      <div className="text-sm text-neutral-400">Reviews</div>
                      <div className="text-2xl font-bold text-neutral-100">13</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <a 
                    href="https://www.fiverr.com/josejsanahuja/create-a-full-stack-application"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent-400 hover:text-accent-300 font-semibold transition-colors"
                  >
                    Ver perfil completo en Fiverr
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Testimonials */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Testimonial 1 - Joaco B. with photo */}
                <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <picture>
                      <source srcSet="https://cdn.sanahuja.dev/sanahujadev/fiverr-client-joaco/original.webp" type="image/webp" />
                      <img 
                        src="https://cdn.sanahuja.dev/sanahujadev/fiverr-client-joaco/jpeg/fiverr-client-joaco-360w.jpeg" 
                        alt="Avatar of Joaco B."
                        className="w-12 h-12 rounded-full object-cover"
                        width="48"
                        height="48"
                        loading="lazy"
                      />
                    </picture>
                    <div>
                      <h3 className="text-lg font-medium text-neutral-50">Joaco B.</h3>
                      <p className="text-sm text-neutral-400">Cliente Valorado</p>
                    </div>
                  </div>
                  <p className="text-neutral-300 leading-relaxed">
                    Fue muy atento y estuvo muy pendiente a las dudas y revisiones que tuve del pedido. Altamente recomendado.
                  </p>
                </div>

                {/* Testimonial 2 - Alerco with initial */}
                <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary-500/20 flex items-center justify-center border border-secondary-500/30">
                      <span className="text-secondary-400 font-bold text-xl">A</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-neutral-50">Alerco</h3>
                      <p className="text-sm text-neutral-400">Cliente Valorado</p>
                    </div>
                  </div>
                  <p className="text-neutral-300 leading-relaxed">
                    La relación con José Javier y su trabajo son extraordinarios.
                  </p>
                </div>

                {/* Testimonial 3 - ihatemyclass with initial */}
                <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent-500/20 flex items-center justify-center border border-accent-500/30">
                      <span className="text-accent-400 font-bold text-xl">I</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-neutral-50">ihatemyclass</h3>
                      <p className="text-sm text-neutral-400">Cliente Valorado</p>
                    </div>
                  </div>
                  <p className="text-neutral-300 leading-relaxed">
                    Trabajo fantástico! Aunque no expresé mi disponibilidad al principio, hicieron un trabajo excelente. Entienden bien el inglés y es fácil trabajar con ellos.
                  </p>
                </div>

                {/* Testimonial 4 - Antoine R. with photo */}
                <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <picture>
                      <source srcSet="https://cdn.sanahuja.dev/sanahujadev/fiverr-client-antoine/original.webp" type="image/webp" />
                      <img 
                        src="https://cdn.sanahuja.dev/sanahujadev/fiverr-client-antoine/jpeg/fiverr-client-antoine-360w.jpeg" 
                        alt="Avatar of Antoine R."
                        className="w-12 h-12 rounded-full object-cover"
                        width="48"
                        height="48"
                        loading="lazy"
                      />
                    </picture>
                    <div>
                      <h3 className="text-lg font-medium text-neutral-50">Antoine R.</h3>
                      <p className="text-sm text-neutral-400">Cliente Valorado</p>
                    </div>
                  </div>
                  <p className="text-neutral-300 leading-relaxed">
                    Excelente trabajo, como siempre.
                  </p>
                </div>

                {/* Testimonial 5 - Fengjason with initial */}
                <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center border border-primary-500/30">
                      <span className="text-primary-400 font-bold text-xl">F</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-neutral-50">Fengjason</h3>
                      <p className="text-sm text-neutral-400">Cliente Valorado</p>
                    </div>
                  </div>
                  <p className="text-neutral-300 leading-relaxed">
                    Este es mi segundo pedido con el Señor José, una experiencia realmente genial. Me ha ayudado más allá de lo acordado y definitivamente lo recomendaré! Muchas gracias, señor!
                  </p>
                </div>

                {/* Testimonial 6 - Thomas 8. with initial */}
                <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary-500/20 flex items-center justify-center border border-secondary-500/30">
                      <span className="text-secondary-400 font-bold text-xl">T</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-neutral-50">Thomas 8.</h3>
                      <p className="text-sm text-neutral-400">Cliente Valorado</p>
                    </div>
                  </div>
                  <p className="text-neutral-300 leading-relaxed">
                    Excelente proveedor de servicios. Muy contento con la comunicación, la capacidad de respuesta y el conocimiento general de José sobre arquitectura de bases de datos. 100% recomendado. Gracias José por tu ayuda.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final Section */}
        <section className="py-16 bg-gradient-to-b from-neutral-900 to-neutral-950">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-primary-900/20 via-neutral-900 to-neutral-900 border-2 border-primary-500/30 rounded-2xl p-8 md:p-12 text-center space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-neutral-50 text-balance">
                    Empecemos a Construir tu Futuro Digital
                  </h2>
                  <p className="text-lg text-neutral-300 max-w-2xl mx-auto text-pretty">
                    ¿Hablamos? Rellena el formulario inicial y definamos juntos qué es el éxito para ti. Sin rodeos, sin abandonos.
                  </p>
                  <p className="text-neutral-400">
                    <strong className="text-primary-400">Tu éxito es mi éxito.</strong> Empecemos hoy.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/es/formulario-inicial/"
                    className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg transition-all duration-200 shadow-lg shadow-primary-900/50 hover:shadow-xl hover:shadow-primary-900/60 hover:scale-105"
                  >
                    ¡Empieza tu Proyecto!
                  </Link>
                  <Link 
                    href="/es/packs/"
                    className="inline-flex items-center justify-center px-8 py-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-semibold rounded-lg transition-all duration-200 border border-neutral-700"
                  >
                    Ver Packs Estratégicos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
```