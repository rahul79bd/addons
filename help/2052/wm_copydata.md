EverEdit支持使用WM_COPYDATA进行简单的数据传递。支持文本的获取、删除、增加，光标的移动和获取操作等。

具体的flag值如下：
```c
#define COPYDATA_GETTEXTW				100
#define COPYDATA_GETTEXTUTF8			101
#define COPYDATA_CLEARTEXT				102
#define COPYDATA_GETCARETLINE			103
#define COPYDATA_GETCARETCOL			104
#define COPYDATA_GETLINETEXTW			105
#define COPYDATA_GETLINETEXTUTF8		106
#define COPYDATA_INSERTTEXTW			107
#define COPYDATA_INSERTTEXTUTF8			108
#define COPYDATA_SETCARET				109
#define COPYDATA_DELETETEXT				110
#define COPYDATA_SETSEL					111
#define COPYDATA_GETTEXTASFILEUTF8		112
#define COPYDATA_HASNORMALSEL			113
#define COPYDATA_GETNORMALSELW			114
#define COPYDATA_GETNORMALSELUTF8		115
#define COPYDATA_GETNORMALSELASFILEUTF8	116
#define COPYDATA_EXECUTESCRIPT_ANSIPATH	117
#define COPYDATA_EXECUTESCRIPT_UTF8PATH	118
```

###COPYDATA_GETTEXTW
以UTF16形式获取所有的文本。发送方需要响应WM_COPYDATA并获取EverEdit发送的文本数据。

```
COPYDATASTRUCT cds;
cds.dwData = COPYDATA_GETTEXTW;
cds.lpData = NULL;
cds.cbData = 0;
::SendMessage(hWnd, WM_COPYDATA, m_hWnd, (LPARAM)&cds);
```
接收方需要处理WM_COPYDATA,如下:
```
LRESULT OnCopyData(UINT /*uMsg*/, WPARAM /*wParam*/, LPARAM lParam, BOOL& /*bHandled*/)
{
	COPYDATASTRUCT* pCDS = (COPYDATASTRUCT*)lParam;
	if( pCDS->dwData==COPYDATA_GETTEXTW ){
		LPCTSTR lpText=(LPCTSTR)pCDS->lpData;
		HWND hWnd=GetDlgItem(IDC_EDIT1);
		::SetWindowText(hWnd, lpText);
	}
	else if( pCDS->dwData==COPYDATA_GETLINETEXTUTF8 ){
		LPCSTR lpText=(LPCSTR)pCDS->lpData;
		ATLTRACE(lpText);
	}
	else if( pCDS->dwData==COPYDATA_GETTEXTUTF8 ){
		LPCSTR lpText=(LPCSTR)pCDS->lpData;
		ATLTRACE(lpText);
	}
	return TRUE;
}
```

###COPYDATA_GETTEXTUTF8
以UTF8形式获取所有的文本。发送方需要响应WM_COPYDATA并获取EverEdit发送的文本数据。

###COPYDATA_CLEARTEXT
清空文本

###COPYDATA_GETCARETLINE
获取光标所在的行
```
COPYDATASTRUCT cds;
cds.dwData = COPYDATA_GETCARETLINE;
cds.lpData = NULL;
cds.cbData = 0;
int line=::SendMessage(hWnd, WM_COPYDATA, NULL, (LPARAM)&cds);
```


###COPYDATA_GETCARETCOL
获取光标所在的列

###COPYDATA_GETLINETEXTW
以UTF16形式获取光标行的文本。发送方需要响应WM_COPYDATA并获取EverEdit发送的文本数据。

###COPYDATA_GETLINETEXTUTF8
以UTF8形式获取光标行的文本。发送方需要响应WM_COPYDATA并获取EverEdit发送的文本数据。

###COPYDATA_INSERTTEXTW
以UTF16形式插入文本到光标处。
```
COPYDATASTRUCT cds;
cds.dwData = COPYDATA_INSERTTEXTW;
cds.lpData = L"hello";
cds.cbData = 10;
::SendMessage(hWnd, WM_COPYDATA, NULL, (LPARAM)&cds);
```

###COPYDATA_INSERTTEXTUTF8
以UTF8形式插入文本到光标处。

###COPYDATA_SETCARET
设置光标位置

```
int arr[]={3,2};
COPYDATASTRUCT cds;
cds.dwData = COPYDATA_SETCARET;
cds.lpData = &arr;
cds.cbData = _countof(arr)*sizeof(int);
::SendMessage(hWnd, WM_COPYDATA, NULL, (LPARAM)&cds);
```

###COPYDATA_DELETETEXT
删除指定区域的文本

```
int arr[]={1,0,4,2};
COPYDATASTRUCT cds;
cds.dwData = COPYDATA_DELETETEXT;
cds.lpData = &arr;
cds.cbData = _countof(arr)*sizeof(int);
::SendMessage(hWnd, WM_COPYDATA, NULL, (LPARAM)&cds);
```

###COPYDATA_SETSEL
设定选区。

```
int arr[]={1,0,4,2};
COPYDATASTRUCT cds;
cds.dwData = COPYDATA_SETSEL;
cds.lpData = &arr;
cds.cbData = _countof(arr)*sizeof(int);
::SendMessage(hWnd, WM_COPYDATA, NULL, (LPARAM)&cds);
```

###COPYDATA_GETTEXTASFILEUTF8
以UTF8形式把所有文本导出到临时文件夹中EE_SHAREFILE.txt的文本中。
```
COPYDATASTRUCT cds;
cds.dwData = COPYDATA_GETTEXTASFILEUTF8;
cds.lpData = NULL;
cds.cbData = 0;
BOOL ret=::SendMessage(hWnd, WM_COPYDATA, (WPARAM)m_hWnd, (LPARAM)&cds);
```

###COPYDATA_HASNORMALSEL
当前文档是否含有普通的选区
```
COPYDATASTRUCT cds;
cds.dwData = COPYDATA_HASNORMALSEL;
cds.lpData = NULL;
cds.cbData = 0;
BOOL ret=::SendMessage(hWnd, WM_COPYDATA, (WPARAM)m_hWnd, (LPARAM)&cds);
```

###COPYDATA_GETNORMALSELW
以UTF16形式获取普通选区的文本。发送方需要响应WM_COPYDATA并获取EverEdit发送的文本数据。

###COPYDATA_GETNORMALSELUTF8
以UTF8形式获取普通选区的文本。发送方需要响应WM_COPYDATA并获取EverEdit发送的文本数据。

###COPYDATA_GETNORMALSELASFILEUTF8
以UTF8形式把普通选区的文本导出到临时文件夹中EE_SHAREFILE.txt的文本中。
```
COPYDATASTRUCT cds;
cds.dwData = COPYDATA_GETNORMALSELASFILEUTF8;
cds.lpData = NULL;
cds.cbData = 0;
BOOL ret=::SendMessage(hWnd, WM_COPYDATA, (WPARAM)m_hWnd, (LPARAM)&cds);
```

###COPYDATA_EXECUTESCRIPT_ANSIPATH
###COPYDATA_EXECUTESCRIPT_UTF8PATH
让EverEdit执行一个指定的脚本。ANSI和UTF8指该脚本路径的编码方式。
```
COPYDATASTRUCT cds;
cds.dwData = COPYDATA_EXECUTESCRIPT_ANSIPATH;
cds.lpData = "c:/my.mac";
cds.cbData = 0;
BOOL ret=::SendMessage(hWnd, WM_COPYDATA, (WPARAM)m_hWnd, (LPARAM)&cds);
```


注意：凡是需要主动响应EverEdit返回数据的时候（主要是获取文本的时候），wParam必须要传递有效的HWND。