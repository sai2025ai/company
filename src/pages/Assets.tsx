import React, { useState } from 'react';
import { Database, FileText, Image as ImageIcon, Video, FileAudio, FileJson, Link as LinkIcon, Download, Search, PlayCircle, PauseCircle, Play, FileCode2, FileSpreadsheet, ChevronRight, ChevronDown, Folder, FolderOpen, GitBranch, Target } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import { mockProjects } from '../data/mockData';

// Mock Tree Data
const assetTreeConfig = [
  {
    id: 'g1',
    name: 'O1: 核心业务实现规模化',
    type: 'goal',
    children: [
      {
        id: 'p1',
        name: '智能推荐系统 (fx)',
        type: 'project',
        children: [
          { id: 'i1', name: 'main', type: 'iteration' },
          { id: 'i2', name: 'v2.0-beta', type: 'iteration' },
        ]
      },
      {
        id: 'p2',
        name: 'vite-test',
        type: 'project',
        children: [
          { id: 'i3', name: 'iter-test', type: 'iteration' },
        ]
      }
    ]
  },
  {
    id: 'g2',
    name: 'O2: 构建流量池矩阵',
    type: 'goal',
    children: [
      {
        id: 'p3',
        name: '自动化营销引擎',
        type: 'project',
        children: [
          { id: 'i4', name: 'sprint-1', type: 'iteration' },
          { id: 'i5', name: 'sprint-2', type: 'iteration' },
        ]
      }
    ]
  }
];

// Mock Asset Data
const mockAssets = [
  { id: 'ast-001', name: 'Q3 财务分析与营收预测', type: 'document', ext: 'pdf', size: '2.4 MB', date: '2026-04-25', projectId: 'PRJ-1025' },
  { id: 'ast-002', name: '智能客服产品推介PPT', type: 'document', ext: 'pptx', size: '15.1 MB', date: '2026-04-24', projectId: 'PRJ-1025' },
  { id: 'ast-003', name: '主站UI重构设计图', type: 'image', ext: 'fig', size: '8.4 MB', date: '2026-04-25', projectId: 'PRJ-1030', url: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&q=80&w=400' },
  { id: 'ast-004', name: '全渠道宣发推广底图', type: 'image', ext: 'png', size: '1.2 MB', date: '2026-04-23', projectId: 'PRJ-1032', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400' },
  { id: 'ast-005', name: '品牌宣传视频最终版', type: 'video', ext: 'mp4', size: '124.5 MB', date: '2026-04-20', projectId: 'PRJ-1032', duration: '03:45' },
  { id: 'ast-006', name: 'CEO年度讲话播客切片', type: 'audio', ext: 'mp3', size: '14.2 MB', date: '2026-04-18', projectId: 'PRJ-1025', duration: '12:30' },
  { id: 'ast-007', name: '新老用户画像关联分析', type: 'data', ext: 'csv', size: '4.8 MB', date: '2026-04-26', projectId: 'PRJ-1025' },
  { id: 'ast-008', name: '智能推荐算法核心模型', type: 'code', ext: 'md', size: '128 KB', date: '2026-04-25', projectId: 'PRJ-1030' },
  { id: 'ast-009', name: 'API接口技术文档', type: 'document', ext: 'docx', size: '512 KB', date: '2026-04-21', projectId: 'PRJ-1030' },
];

export function Assets() {
  const getProjectName = (projectId: string) => {
    const proj = mockProjects.find(p => p.id === projectId);
    return proj ? proj.name : '未知关联项目';
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText size={24} className="text-blue-400" />;
      case 'image': return <ImageIcon size={24} className="text-purple-400" />;
      case 'video': return <Video size={24} className="text-orange-400" />;
      case 'audio': return <FileAudio size={24} className="text-emerald-400" />;
      case 'data': return <FileSpreadsheet size={24} className="text-amber-400" />;
      case 'code': return <FileCode2 size={24} className="text-slate-400" />;
      default: return <FileText size={24} className="text-slate-400" />;
    }
  };

  const filterAssets = (category: string) => {
    if (category === 'all') return mockAssets;
    return mockAssets.filter(asset => asset.type === category);
  };

  const AssetCardFooter = ({ asset }: { asset: any }) => (
    <div className="pt-3 border-t border-white/5 mt-auto">
      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2 truncate">
        <LinkIcon size={12} className="shrink-0" />
        <span className="truncate">关联项目: <span className="text-blue-400/80 hover:text-blue-400 cursor-pointer">{getProjectName(asset.projectId)}</span></span>
      </div>
      <div className="flex items-center justify-between text-[10px] text-slate-500">
        <span>产出时间: {asset.date}</span>
        <button className="flex items-center gap-1 text-slate-400 hover:text-blue-400 transition-colors">
          <Download size={12} /> <span className="hidden sm:inline">下载</span>
        </button>
      </div>
    </div>
  );

  const renderAssetCard = (asset: any) => {
    switch (asset.type) {
      case 'image':
        return (
          <Card key={asset.id} className="border-white/5 bg-black/20 hover:bg-black/40 hover:border-white/10 transition-all group overflow-hidden flex flex-col">
            <div className="relative h-32 w-full overflow-hidden bg-black/60">
              {asset.url ? (
                <img src={asset.url} alt={asset.name} className="object-cover w-full h-full opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-600"><ImageIcon size={32} /></div>
              )}
              <Badge variant="secondary" className="absolute top-2 right-2 font-mono text-[9px] px-1 bg-black/60 backdrop-blur-md border-white/10 text-slate-300 uppercase">
                {asset.ext}
              </Badge>
            </div>
            <CardContent className="p-4 flex flex-col flex-1">
              <h3 className="font-medium text-slate-200 truncate mb-1" title={asset.name}>{asset.name}</h3>
              <div className="text-xs text-slate-500 mb-3">{asset.size}</div>
              <AssetCardFooter asset={asset} />
            </CardContent>
          </Card>
        );
      
      case 'video':
        return (
          <Card key={asset.id} className="border-white/5 bg-black/20 hover:bg-black/40 hover:border-white/10 transition-all group overflow-hidden flex flex-col">
            <div className="relative h-32 w-full bg-gradient-to-br from-slate-800 to-black flex items-center justify-center group-hover:from-slate-700 transition-colors border-b border-white/5">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 backdrop-blur-sm flex items-center justify-center text-orange-400 border border-orange-500/30 group-hover:scale-110 group-hover:bg-orange-500/30 group-hover:text-orange-300 transition-all cursor-pointer">
                <Play className="ml-1" size={20} fill="currentColor" />
              </div>
              <Badge variant="secondary" className="absolute bottom-2 right-2 font-mono text-[10px] px-1.5 bg-black/60 backdrop-blur-md border-white/10 text-slate-300">
                {asset.duration}
              </Badge>
              <Badge variant="secondary" className="absolute top-2 right-2 font-mono text-[9px] px-1 bg-black/60 backdrop-blur-md border-white/10 text-slate-300 uppercase">
                {asset.ext}
              </Badge>
            </div>
            <CardContent className="p-4 flex flex-col flex-1">
              <h3 className="font-medium text-slate-200 truncate mb-1" title={asset.name}>{asset.name}</h3>
              <div className="text-xs text-slate-500 mb-3">{asset.size}</div>
              <AssetCardFooter asset={asset} />
            </CardContent>
          </Card>
        );

      case 'audio':
        return (
          <Card key={asset.id} className="border-emerald-500/10 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/20 transition-all group flex flex-col">
            <CardContent className="p-4 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-4">
                <button className="h-10 w-10 shrink-0 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center hover:bg-emerald-500/30 hover:scale-105 transition-all">
                  <PlayCircle size={24} />
                </button>
                <div className="flex-1 overflow-hidden">
                  <h3 className="font-medium text-slate-200 truncate text-sm" title={asset.name}>{asset.name}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-emerald-400/70 font-mono">00:00 / {asset.duration}</span>
                    <Badge variant="secondary" className="font-mono text-[9px] px-1 bg-black/40 border-white/5 text-slate-400 uppercase">
                      {asset.ext}
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* Fake Audio Waveform */}
              <div className="flex items-end gap-[2px] h-6 mb-4 px-1 opacity-50 group-hover:opacity-80 transition-opacity">
                {[...Array(30)].map((_, i) => (
                  <div key={i} className="w-full bg-emerald-500/30 rounded-t-sm" style={{ height: `${Math.max(10, Math.random() * 100)}%` }}></div>
                ))}
              </div>

              <AssetCardFooter asset={asset} />
            </CardContent>
          </Card>
        );

      default:
        // Document, Code, Data
        return (
          <Card key={asset.id} className="border-white/5 bg-black/20 hover:bg-black/40 hover:border-white/10 transition-all group flex flex-col">
            <CardContent className="p-4 flex flex-col h-full gap-4 flex-1">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-lg border border-white/5 group-hover:bg-white/10 transition-colors shrink-0">
                  {getIcon(asset.type)}
                </div>
                <div className="flex-1 overflow-hidden flex flex-col justify-center min-h-[48px]">
                  <h3 className="font-medium text-slate-200 truncate mb-1" title={asset.name}>{asset.name}</h3>
                  <div className="flex items-center gap-2 mt-auto">
                    <Badge variant="secondary" className="font-mono text-[9px] px-1 bg-white/10 border-white/5 text-slate-300 uppercase">
                      {asset.ext}
                    </Badge>
                    <span className="text-xs text-slate-500">{asset.size}</span>
                  </div>
                </div>
              </div>
              <AssetCardFooter asset={asset} />
            </CardContent>
          </Card>
        );
    }
  };

  const AssetGrid = ({ category }: { category: string }) => {
    const assets = filterAssets(category);
    
    if (assets.length === 0) {
      return <div className="text-center py-12 text-slate-500 italic">该分类下暂无资产产出...</div>;
    }

    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
        {assets.map(asset => renderAssetCard(asset))}
      </div>
    );
  };

  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set(['g1', 'p1', 'p2']));
  const [selectedKey, setSelectedKey] = useState<string>('g1');

  const toggleExpand = (e: React.MouseEvent, key: string) => {
    e.stopPropagation();
    const newSet = new Set(expandedKeys);
    if (newSet.has(key)) {
      newSet.delete(key);
    } else {
      newSet.add(key);
    }
    setExpandedKeys(newSet);
  };

  const TreeNode = ({ node, level = 0 }: { node: any, level?: number }) => {
    const isExpanded = expandedKeys.has(node.id);
    const isSelected = selectedKey === node.id;
    const hasChildren = node.children && node.children.length > 0;

    const getIconForType = () => {
      switch (node.type) {
        case 'goal': return <Target size={16} className="text-blue-400" />;
        case 'project': return isExpanded ? <FolderOpen size={16} className="text-slate-400" /> : <Folder size={16} className="text-slate-400" />;
        case 'iteration': return <GitBranch size={16} className="text-slate-500" />;
        default: return null;
      }
    };

    return (
      <div className="select-none">
        <div 
          className={`flex items-center gap-1.5 py-1.5 px-2 rounded-md hover:bg-white/5 cursor-pointer transition-colors ${isSelected ? 'bg-blue-500/10 text-blue-400' : 'text-slate-300'}`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => setSelectedKey(node.id)}
        >
          <div 
            className="w-4 h-4 flex items-center justify-center -ml-1 text-slate-500 hover:text-slate-300 transition-colors"
            onClick={(e) => hasChildren && toggleExpand(e, node.id)}
          >
            {hasChildren && (isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
          </div>
          <div className="flex items-center gap-2">
            {getIconForType()}
            <span className="text-sm font-medium truncate">{node.name}</span>
          </div>
        </div>
        {hasChildren && isExpanded && (
          <div className="mt-0.5 space-y-0.5">
            {node.children.map((child: any) => (
              <TreeNode key={child.id} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-2rem)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <h1 className="text-2xl font-bold tracking-tight glow-text flex items-center gap-2 border-l-4 border-blue-500 pl-3">
          <Database className="text-blue-400" />
          数字资产沉淀库
        </h1>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input 
            type="text" 
            placeholder="搜索资产、格式或关联项目..." 
            className="pl-9 pr-4 py-2 bg-black/20 border border-white/10 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-blue-500/50 w-full sm:w-64"
          />
        </div>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
        <div className="w-64 shrink-0 flex flex-col bg-black/20 border border-white/5 rounded-xl overflow-hidden">
          <div className="p-3 border-b border-white/5 text-xs font-semibold text-slate-400 tracking-wider">
            资产视图目录树
          </div>
          <div className="p-2 overflow-y-auto flex-1 custom-scrollbar">
            {assetTreeConfig.map(node => (
              <TreeNode key={node.id} node={node} />
            ))}
          </div>
        </div>

        <div className="flex-1 min-w-0 bg-black/20 border border-white/5 rounded-xl p-4 flex flex-col">
          <Tabs defaultValue="all" className="flex flex-col h-full">
            <TabsList className="mb-4 bg-black/40 p-1 rounded-lg border-white/5 inline-flex flex-wrap h-auto shrink-0">
              <TabsTrigger value="all" className="rounded-md">全部分类</TabsTrigger>
              <TabsTrigger value="document" className="rounded-md flex items-center gap-1.5"><FileText size={14}/> 文档</TabsTrigger>
              <TabsTrigger value="image" className="rounded-md flex items-center gap-1.5"><ImageIcon size={14}/> 图像与设计</TabsTrigger>
              <TabsTrigger value="video" className="rounded-md flex items-center gap-1.5"><Video size={14}/> 视频</TabsTrigger>
              <TabsTrigger value="audio" className="rounded-md flex items-center gap-1.5"><FileAudio size={14}/> 音频</TabsTrigger>
              <TabsTrigger value="data" className="rounded-md flex items-center gap-1.5"><FileSpreadsheet size={14}/> 数据</TabsTrigger>
              <TabsTrigger value="code" className="rounded-md flex items-center gap-1.5"><FileCode2 size={14}/> 源码技术</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
              <TabsContent value="all" className="mt-0 h-full"><AssetGrid category="all" /></TabsContent>
              <TabsContent value="document" className="mt-0 h-full"><AssetGrid category="document" /></TabsContent>
              <TabsContent value="image" className="mt-0 h-full"><AssetGrid category="image" /></TabsContent>
              <TabsContent value="video" className="mt-0 h-full"><AssetGrid category="video" /></TabsContent>
              <TabsContent value="audio" className="mt-0 h-full"><AssetGrid category="audio" /></TabsContent>
              <TabsContent value="data" className="mt-0 h-full"><AssetGrid category="data" /></TabsContent>
              <TabsContent value="code" className="mt-0 h-full"><AssetGrid category="code" /></TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

