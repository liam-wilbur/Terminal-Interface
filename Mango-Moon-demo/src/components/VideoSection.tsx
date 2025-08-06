interface VideoSectionProps {
    title: string;
    videoUrl: string;
    description?: string;
  }
  
  const VideoSection = ({ title, videoUrl, description }: VideoSectionProps) => {
    // Extract YouTube video ID from URL
    const getVideoId = (url: string) => {
      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
      return match ? match[1] : '';
    };
  
    const videoId = getVideoId(videoUrl);
  
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-mango mb-2">{title}</h3>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-cosmic border border-border">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
    );
  };
  
  export default VideoSection;