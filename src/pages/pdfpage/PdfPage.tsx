import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Убираем useParams, так как ID больше не нужен
import { Button } from '@/shared/ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Download, X } from 'lucide-react';

interface PDFReaderProps {
  className?: string;
}

export const PDFReader: React.FC<PDFReaderProps> = ({ className }) => {
  // Убираем получение ID из параметров
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.2);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);

  // Загрузка PDF.js
  useEffect(() => {
    const loadPdfJs = async () => {
      try {
        // Динамическая загрузка PDF.js
        const pdfjsLib = await import('pdfjs-dist');
        
        // Настройка worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@5.2.133/build/pdf.worker.min.mjs`;
        
        // Используем фиксированную ссылку на PDF файл
        const pdfUrl = 'https://pdfobject.com/pdf/sample.pdf';
        
        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          // Отключаем возможность сохранения
          disableAutoFetch: true,
          disableStream: true,
          disableRange: true
        });
        
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);
        setIsLoading(false);
        
        // Рендерим первую страницу
        renderPage(1, pdf);
      } catch (err) {
        console.error('Ошибка загрузки PDF.js:', err);
        setError('Ошибка загрузки PDF документа');
        setIsLoading(false);
      }
    };

    loadPdfJs();
  }, []); // Убираем зависимость от id

  const renderPage = async (pageNum: number, pdf?: any) => {
    if (!canvasRef.current) return;
    
    const document = pdf || pdfDoc;
    if (!document) return;

    try {
      const page = await document.getPage(pageNum);
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (!context) return;

      const viewport = page.getViewport({ scale, rotation });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      await page.render(renderContext).promise;
    } catch (err) {
      setError('Ошибка рендеринга страницы');
    }
  };

  // Обновление страницы при изменении параметров
  useEffect(() => {
    if (pdfDoc) {
      renderPage(currentPage);
    }
  }, [currentPage, scale, rotation, pdfDoc]);

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const rotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleClose = () => {
    navigate(-1);
  };

  // Блокировка контекстного меню и горячих клавиш
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Блокируем Ctrl+S, Ctrl+P, F12, и другие
      if (
        (e.ctrlKey && (e.key === 's' || e.key === 'p' || e.key === 'a')) ||
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J')
      ) {
        e.preventDefault();
      }
    };

    const handlePrint = () => {
      alert('Печать документа запрещена');
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('beforeprint', handlePrint);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('beforeprint', handlePrint);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#fff9dc] dark:bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-secondary-foreground mb-4">Загрузка PDF...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#fff9dc] dark:bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Ошибка</h2>
          <p className="text-secondary-foreground mb-4">{error}</p>
          <Button onClick={handleClose}>Вернуться назад</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#2a2a2a] ${className}`}>
      {/* Верхняя панель управления */}
      <div className="bg-[#1a1a1a] border-b border-gray-700 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="small"
              onClick={handleClose}
              className="text-white hover:bg-gray-700"
            >
              <X className="h-4 w-4 mr-2" />
              Закрыть
            </Button>
            
            <div className="text-white text-sm">
              Страница {currentPage} из {totalPages}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Навигация по страницам */}
            <Button
              variant="ghost"
              size="small"
              onClick={goToPrevPage}
              disabled={currentPage <= 1}
              className="text-white hover:bg-gray-700 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="small"
              onClick={goToNextPage}
              disabled={currentPage >= totalPages}
              className="text-white hover:bg-gray-700 disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Масштабирование */}
            <Button
              variant="ghost"
              size="small"
              onClick={zoomOut}
              className="text-white hover:bg-gray-700"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            
            <span className="text-white text-sm px-2">
              {Math.round(scale * 100)}%
            </span>
            
            <Button
              variant="ghost"
              size="small"
              onClick={zoomIn}
              className="text-white hover:bg-gray-700"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>

            {/* Поворот */}
            <Button
              variant="ghost"
              size="small"
              onClick={rotate}
              className="text-white hover:bg-gray-700"
            >
              <RotateCw className="h-4 w-4" />
            </Button>

            {/* Заблокированная кнопка скачивания */}
            <Button
              variant="ghost"
              size="small"
              disabled
              className="text-gray-500 cursor-not-allowed"
              title="Скачивание запрещено"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Область просмотра PDF */}
      <div className="flex-1 overflow-auto p-4">
        <div className="flex justify-center">
          <div className="bg-white shadow-2xl">
            <canvas
              ref={canvasRef}
              className="max-w-full h-auto"
              style={{
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none'
              }}
            />
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default PDFReader;