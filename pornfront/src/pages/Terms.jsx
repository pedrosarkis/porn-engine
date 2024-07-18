
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';


const TermsOfService = () => {
    const { i18n } = useTranslation()
    const [TermsComponent, setTermsComponent] = useState(null);

    // useEffect(() => {
    //     document.title = t('termsOfService');
    // }, [t])

    useEffect(() => {
        const language = i18n.language
        console.log(language)
        import(`../../public/terms-${language.substring(0, 2)}.html?raw`) 
        .then(module => setTermsComponent(module.default))
        .catch(error => console.error('Erro ao importar os termos de uso:', error));
    }, [i18n.language]);
    
    return TermsComponent ? (
        <div dangerouslySetInnerHTML={{ __html: TermsComponent }} />
    ) : (
        <div>Loading...</div>
    );
    };

export default TermsOfService;