import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar, DollarSign, Edit, Plus, User } from "lucide-react";

interface Deal {
  id: string;
  companyName: string;
  contactPerson: string;
  productName: string;
  expectedAmount: number;
  status: "引合" | "商談中" | "提案済" | "成約" | "失注";
  probability: number;
  expectedCloseDate: string;
  notes: string;
}

const initialDeals: Deal[] = [
  {
    id: "1",
    companyName: "フレッシュマート",
    contactPerson: "田中太郎",
    productName: "ふじりんご（青森県産）",
    expectedAmount: 250000,
    status: "商談中",
    probability: 60,
    expectedCloseDate: "2025-02-15",
    notes: "決裁者との面談予定"
  },
  {
    id: "2",
    companyName: "グリーンストア",
    contactPerson: "佐藤花子",
    productName: "章姫いちご（静岡県産）",
    expectedAmount: 180000,
    status: "提案済",
    probability: 80,
    expectedCloseDate: "2025-01-30",
    notes: "価格調整が必要"
  },
  {
    id: "3",
    companyName: "オーガニック市場",
    contactPerson: "鈴木次郎",
    productName: "有機レタス（長野県産）",
    expectedAmount: 85000,
    status: "成約",
    probability: 100,
    expectedCloseDate: "2025-01-20",
    notes: "納期要確認"
  },
];

export default function SalesManagement() {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    productName: "",
    expectedAmount: "",
    status: "引合" as Deal["status"],
    probability: "",
    expectedCloseDate: "",
    notes: "",
  });

  const getStatusColor = (status: Deal["status"]) => {
    switch (status) {
      case "引合": return "secondary";
      case "商談中": return "default";
      case "提案済": return "outline";
      case "成約": return "default";
      case "失注": return "destructive";
      default: return "secondary";
    }
  };

  const handleSave = () => {
    if (editingDeal) {
      setDeals(deals.map(d => 
        d.id === editingDeal.id 
          ? { 
              ...editingDeal, 
              ...formData, 
              expectedAmount: Number(formData.expectedAmount),
              probability: Number(formData.probability)
            }
          : d
      ));
    } else {
      const newDeal: Deal = {
        id: Date.now().toString(),
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        productName: formData.productName,
        expectedAmount: Number(formData.expectedAmount),
        status: formData.status,
        probability: Number(formData.probability),
        expectedCloseDate: formData.expectedCloseDate,
        notes: formData.notes,
      };
      setDeals([...deals, newDeal]);
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (deal: Deal) => {
    setEditingDeal(deal);
    setFormData({
      companyName: deal.companyName,
      contactPerson: deal.contactPerson,
      productName: deal.productName,
      expectedAmount: deal.expectedAmount.toString(),
      status: deal.status,
      probability: deal.probability.toString(),
      expectedCloseDate: deal.expectedCloseDate,
      notes: deal.notes,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      companyName: "",
      contactPerson: "",
      productName: "",
      expectedAmount: "",
      status: "引合",
      probability: "",
      expectedCloseDate: "",
      notes: "",
    });
    setEditingDeal(null);
  };

  const handleAdd = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2>商談・引合管理</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              商談追加
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingDeal ? "商談編集" : "商談追加"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName">会社名</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="contactPerson">担当者</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="productName">商品名</Label>
                <Input
                  id="productName"
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="expectedAmount">予想金額（円）</Label>
                <Input
                  id="expectedAmount"
                  type="number"
                  value={formData.expectedAmount}
                  onChange={(e) => setFormData({ ...formData, expectedAmount: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="status">ステータス</Label>
                <Select value={formData.status} onValueChange={(value: Deal["status"]) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="引合">引合</SelectItem>
                    <SelectItem value="商談中">商談中</SelectItem>
                    <SelectItem value="提案済">提案済</SelectItem>
                    <SelectItem value="成約">成約</SelectItem>
                    <SelectItem value="失注">失注</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="probability">成約確度（%）</Label>
                <Input
                  id="probability"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.probability}
                  onChange={(e) => setFormData({ ...formData, probability: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="expectedCloseDate">予定成約日</Label>
                <Input
                  id="expectedCloseDate"
                  type="date"
                  value={formData.expectedCloseDate}
                  onChange={(e) => setFormData({ ...formData, expectedCloseDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="notes">備考</Label>
                <Input
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
              <Button onClick={handleSave} className="w-full">
                {editingDeal ? "更新" : "追加"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">総商談数</p>
                <p className="text-xl">{deals.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">予想売上</p>
                <p className="text-xl">¥{deals.reduce((sum, deal) => sum + deal.expectedAmount, 0).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">今月成約予定</p>
                <p className="text-xl">{deals.filter(d => d.expectedCloseDate.startsWith('2025-01')).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">成約済み</p>
                <p className="text-xl">{deals.filter(d => d.status === '成約').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>商談一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>会社名</TableHead>
                <TableHead>担当者</TableHead>
                <TableHead>商品</TableHead>
                <TableHead>予想金額</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>成約確度</TableHead>
                <TableHead>予定日</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell>{deal.companyName}</TableCell>
                  <TableCell>{deal.contactPerson}</TableCell>
                  <TableCell>{deal.productName}</TableCell>
                  <TableCell>¥{deal.expectedAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(deal.status)}>
                      {deal.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{deal.probability}%</TableCell>
                  <TableCell>{deal.expectedCloseDate}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(deal)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}